<template>
  <div>
    <BaseLeftPanel :url="community.url" :contactInfo="primaryContact" />
    <CommunityNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
      :events="cityEvents"
      :destinations="cityDestinations"
      :directory="cityDirectory"
      :community="community"
      :resources="community.resources"
      :primaryContact="primaryContact"
    />
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

    const OrganizationOptions = {
      returnValue: true,
      limit: "500",
    }
    const listOfOrganizations = await store.dispatch(
      "wuapi/getDirectory",
      OrganizationOptions
    )

    const destinationsOptions = {
      returnValue: true,
      limit: "40",
    }
    const listOfDestinations = await store.dispatch(
      "wuapi/getDestinations",
      destinationsOptions
    )

    const eventOptions = {
      returnValue: true,
      type: "latest",
      limit: "20",
    }
    const listOfEvents = await store.dispatch("wuapi/getEvents", eventOptions)

    return {
      communities,
      city_tag_id,
      listOfDestinations,
      listOfEvents,
      listOfOrganizations,
    }
  },

  async fetch() {
    await this.$store.dispatch("getOffices")
    await this.$store.dispatch("getCategories")
    await this.$store.dispatch("getCountyProfiles")
    await this.$store.dispatch("getJobsList")
    // await this.$store.dispatch("getFeaturedImages")
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
    cityDirectory() {
      return this.listOfOrganizations.filter(
        (organizations) =>
          organizations.city.toLowerCase() === this.community.slug
      )
    },
    cityDestinations() {
      return this.listOfDestinations.filter(
        (destinations) =>
          destinations.city.toLowerCase() === this.community.slug
      )
    },
    cityEvents() {
      return this.listOfEvents.filter(
        (events) => events.city.toLowerCase() === this.community.slug
      )
    },
    community() {
      let array = this.communities.filter(
        ({ tags, slug }) => tags.includes(this.city_tag_id) && slug
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
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
    }),
  },

  async created() {
    if (this.community && this.community.media_url != 0) {
      let heroobj = await fetch(
        this.$config.apiUrl + "media/" + this.community.media_url
      )
        .then((response) => response.json())
        .catch((error) => error.response.status)
      this.image_url = heroobj.guid.rendered
    } else {
      this.image_url =
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/09/default.jpeg"
    }
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
