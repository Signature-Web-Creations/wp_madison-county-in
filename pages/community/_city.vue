<template>
  <div>
    <!-- <BaseLeftPanel :url="community.url" :contactInfo="primaryContact" /> -->
    <!-- <CommunityNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
      :events="listOfEvents"
      :destinations="listOfDestinations"
      :community="community"
      :resources="community.resources"
    /> -->
    {{ community }}
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
    image_url: null,
    employment_tag_id: 30,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),

  async asyncData({ store, route }) {
    const communities = await store.dispatch("getCommunities", true)
    const tags = await store.dispatch("getTags", true)

    let city_tag_id = 0
    tags.forEach(({ id, slug }) => {
      if (route.params.city === slug) city_tag_id = id
    })

    return { communities, city_tag_id }
  },

  async fetch() {
    await this.$store.dispatch("getCategories")
    await this.$store.dispatch("getCountyProfiles")
    await this.$store.dispatch("getJobsList")
    await this.$store.dispatch("getFeaturedImages")

    let options = {
      type: "latest",
      limit: "20",
    }
    await this.$store.dispatch("wuapi/getEvents", options)
    await this.$store.dispatch("wuapi/getDestinations")
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
      console.log(this.city_tag_id)
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
          // url: this.community.url,
          phone: primary.phone,
        }
      } else {
        return {
          // title: "Office Administrator",
          email: this.community.email,
          url: this.community.url,
          phone: this.community.phone,
        }
      }
    },

    ...mapState({
      // communities: (state) => state.communities,
      listOfEvents: (state) => state.wuapi.latestEvents,
      listOfDestinations: (state) => state.wuapi.destinations,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      // tags: (state) => state.tags,
    }),
  },

  async created() {
    // console.log(this.community)
    // if (this.community) {
    //   let heroobj = await fetch(
    //     this.$config.apiUrl + "media/" + this.community.media_url
    //   )
    //     .then((response) => response.json())
    //     .catch((error) => error.response.status)
    //   this.image_url = heroobj.guid.rendered
    // } else {
    //   this.image_url =
    //     "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg"
    // }
    // this.community_category_id = this.categoryMap[this.$route.params.community]
    // this.city_tag_id = this.tags[this.$route.params.city]
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
