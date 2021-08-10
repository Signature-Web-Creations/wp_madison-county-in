<template>
  <div>
    <BaseLeftPanel :resources="office.acf.resources" />
    <OfficeNavigation
      :tabs="tabs"
      :backgroundImage="office.media_url == '' ? undefined : office.media_url"
      :events="listOfEvents"
      :team="profiles"
      :office="office"
      :jobs="jobPositions"
      :resources="office.acf.resources"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
import OfficeNavigation from "~/layouts/partials/OfficeNavigation"

export default {
  layout: "office",

  components: { OfficeNavigation },

  data: () => ({
    collapseOnScroll: true,
    department_category_id: "",
    office_tag_id: "",
    employment_tag_id: 30,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),

  async fetch({ store }) {
    await store.dispatch("getOffices")
    await store.dispatch("getCategories")
    await store.dispatch("getTags")
    await store.dispatch("getCountyProfiles")
    await store.dispatch("getJobsList")

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

    office() {
      let array = this.offices.filter(
        ({ categories, tags, slug }) =>
          categories.includes(this.department_category_id) &&
          tags.includes(this.office_tag_id) &&
          slug
      )

      return array[0]
    },

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.department_category_id) &&
          tags.includes(this.office_tag_id)
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
            tags.includes(this.office_tag_id) &&
            tags.includes(this.employment_tag_id)
        )
      }
    },

    ...mapState({
      offices: (state) => state.offices,
      listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      tags: (state) => state.tags,
      listOfJobs: (state) => state.jobs,
    }),
  },

  async created() {
    this.department_category_id = this.categoryMap[
      this.$route.params.department
    ]
    this.office_tag_id = this.tags[this.$route.params.office]
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
