<template>
  <div>
    <BaseLeftPanel :resources="community.acf.resources" />
    <CommunityNavigation
      :tabs="tabs"
      :backgroundImage="
        community.media_url == '' ? undefined : community.media_url
      "
      :events="listOfEvents"
      :team="profiles"
      :community="community"
      :jobs="jobPositions"
      :resources="community.acf.resources"
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
          name: "Team",
          icon: "fa-user-alt",
        },
      ]

      if (this.jobPositions != 0) {
        let jobItem = {
          name: "Jobs",
          icon: "fa-briefcase",
        }
        array.push(jobItem)
      }

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

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.community_category_id) &&
          tags.includes(this.city_tag_id)
      )
    },

    jobPositions() {
      if (this.$route.params.office === "human-resources") {
        return this.listOfJobs.filter(({ tags }) =>
          tags.includes(this.employment_tag_id)
        )
      } else {
        return this.listOfJobs.filter(
          ({ tags }) =>
            tags.includes(this.city_tag_id) &&
            tags.includes(this.employment_tag_id)
        )
      }
    },

    ...mapState({
      communities: (state) => state.communities,
      listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      tags: (state) => state.tags,
      listOfJobs: (state) => state.jobs,
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
