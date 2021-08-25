<template>
  <div>
    <BaseLeftPanel :url="community.acf.url" :contactInfo="primaryContact" />
    <CommunityNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
      :events="listOfEvents"
      :community="community"
      :resources="community.acf.resources"
    />
    {{ setHeroImageUrl }}
  </div>
</template>

<script>
import { mapState } from "vuex"
import CommunityNavigation from "~/layouts/partials/CommunityNavigation"

export default {
  layout: "office",

  components: { CommunityNavigation },

  data: () => ({
    collapseOnScroll: true,
    community_category_id: "",
    image_url: "",
    city_tag_id: "",
    employment_tag_id: 30,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),

  async fetch({ store }) {
    await store.dispatch("getCommunities")
    await store.dispatch("getCategories")
    await store.dispatch("getTags")
    await store.dispatch("getCountyProfiles")
    await store.dispatch("getJobsList")
    await store.dispatch("getFeaturedImages")

    let options = {
      type: "latest",
      limit: "20",
    }
    await store.dispatch("wuapi/getEvents", options)
  },

  computed: {
    tabs() {
      let array = [
        {
          name: "Overview",
          icon: "fa-info-circle",
        },
        {
          name: "Events",
          icon: "fa-calendar-alt",
        },
        {
          name: "Destination",
          icon: "fa-map-signs",
        },
        {
          name: "Directory",
          icon: "fa-address-book",
        },
      ]
      return array
    },

    community() {
      let array = this.communities.filter(
        ({ tags, slug }) =>
          // categories.includes(this.community_category_id) &&
          tags.includes(this.city_tag_id) && slug
      )

      return array[0]
    },

    primaryContact() {
      const primary = this.countyProfiles.find(
        (person) =>
          person.office_primary === true &&
          person.tags[0] === this.office_tag_id
      )

      if (primary) {
        return {
          title: primary.titlerole,
          email: primary.email,
          url: this.office.acf.url,
          phone: primary.phone,
        }
      } else {
        return {
          title: "Office Administrator",
          email: this.community.acf.email,
          url: this.community.acf.url,
          phone: this.community.acf.phone,
        }
      }
    },
    async setHeroImageUrl() {
      console.log("communities", this.communities)
      if (this.community.media_url) {
        let heroobj = await fetch(
          this.$config.apiUrl + "media/" + this.community.media_url
        )
          .then((response) => response.json())
          .catch((error) => error.response.status)
        console.log("this is teams ", heroobj)
        this.image_url = heroobj.guid.rendered
      } else {
        this.image_url =
          "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg"
      }
    },

    ...mapState({
      communities: (state) => state.communities,
      listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      tags: (state) => state.tags,
    }),
  },

  created() {
    console.log(this.categoryMap[this.$route.params.community])
    this.community_category_id = this.categoryMap[this.$route.params.community]
    this.city_tag_id = this.tags[this.$route.params.city]
  },
}
</script>

<style lang="scss" scoped>
.intro_bar {
  padding-top: 130px;
  .section__title {
    font-size: 40px;
  }
  .section__content {
    font-size: 28px;
  }
}

h1 {
  font-family: $font-condensed !important;
}
h2 {
  font-size: 24px !important;
  &::after {
    background: none;
  }
}
.rtl {
  direction: rtl;
}

.v-tabs-slider-wrapper {
  height: 5px !important;
}
.v-tabs-slider {
  border: 2px solid;
}
</style>
