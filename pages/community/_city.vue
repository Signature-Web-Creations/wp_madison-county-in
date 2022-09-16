<template>
  <div>
    <BaseLeftPanel :url="community.url" :contactInfo="primaryContact" />

    <CommunityNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
      :events="listOfEvents"
      :destinations="listOfDestinations"
      :directory="listOfOrganizations"
      :community="community"
      :resources="community.resources"
      :primaryContact="primaryContact"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
import CommunityNavigation from "~/layouts/partials/CommunityNavigation"
import { generalMixin } from "~/mixins/general"

export default {
  layout: "office",

  mixins: [generalMixin],

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
    let tagsoptions = { getPrimary: true }
    const communities = await store.dispatch("getCommunities", true)
    const tags = await store.dispatch("getTags", tagsoptions)
    let city_tag_id = 0
    tags.forEach(({ id, slug }) => {
      if (route.params.city === slug) city_tag_id = id
    })
    const community = communities.filter(
      ({ tags, slug }) => tags.includes(city_tag_id) && slug
    )[0]

    let listOfOrganizations = await store.dispatch("wuapi/getDirectory", {
      returnValue: true,
      limit: "500",
    })
    const filteredOrganizations = listOfOrganizations.filter(
      (organization) => organization.city.toLowerCase() === community.slug
    )
    if (filteredOrganizations.length === 0) {
      listOfOrganizations = await store.dispatch("wuapi/getDestinations", {
        returnValue: true,
        limit: "250",
        zip: communities.filter(
          ({ tags, slug }) => tags.includes(city_tag_id) && slug
        )[0].zip,
        distance: 5,
      })
    } else {
      listOfOrganizations = filteredOrganizations
    }

    let listOfDestinations = await store.dispatch("wuapi/getDestinations", {
      returnValue: true,
      limit: "40",
    })
    const filteredDestinations = listOfDestinations.filter(
      (destinations) => destinations.city.toLowerCase() === community.slug
    )
    if (filteredDestinations.length === 0) {
      listOfDestinations = await store.dispatch("wuapi/getDestinations", {
        returnValue: true,
        limit: "40",
        zip: communities.filter(
          ({ tags, slug }) => tags.includes(city_tag_id) && slug
        )[0].zip,
        distance: 10,
      })
    } else {
      listOfDestinations = filteredDestinations
    }

    let listOfEvents = await store.dispatch("wuapi/getEvents", {
      returnValue: true,
      type: "latest",
      limit: "100",
    })
    const filteredEvents = listOfEvents.filter(
      (events) => events.city.toLowerCase() === community.slug
    )

    if (filteredEvents.length > 0) {
      listOfEvents = filteredEvents
    }
    const countyProfiles = await store.dispatch("getCountyProfiles", {
      categories: community.categories[0],
      tags: community.tags[0],
      returnValue: true,
    })

    return {
      communities,
      city_tag_id,
      listOfDestinations,
      listOfEvents,
      listOfOrganizations,
      countyProfiles,
    }
  },

  async fetch() {
    await this.$store.dispatch("getOffices")
    await this.$store.dispatch("getCategories")
    await this.$store.dispatch("getJobsList")
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

    community() {
      let array = this.communities.filter(
        ({ tags, slug }) => tags.includes(this.city_tag_id) && slug
      )

      return array[0]
    },

    primaryContact() {
      const primary = this.countyProfiles.find(
        (person) =>
          person.primary === true && person.tags[0] === this.city_tag_id
      )
      if (primary) {
        return {
          title: primary.title + ",  " + primary.titlerole,
          email: this.community.email,
          phone: this.community.phone,
        }
      } else {
        return {
          email: this.community.email,
          url: this.community.url,
          phone: this.community.phone,
        }
      }
    },

    ...mapState({
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
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
      this.image_url = await this.setDefault
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
