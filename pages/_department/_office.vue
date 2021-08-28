<template>
  <div>
    <BaseLeftPanel
      :resources="office.acf.resources"
      :contactInfo="primaryContact"
    />

    <OfficeNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
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
    image_url: "",
    office_tag_id: "",
    employment_tag_id: 30,
    // primary: "",
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
    // await store.dispatch("getHeroImages")

    let options = {
      type: "latest",
      limit: "20",
    }
    await store.dispatch("wuapi/getEvents", options)
  },

  // async mounted() {

  // },
  computed: {
    tabs() {
      let array = [
        {
          name: "Overview",
          icon: "fa-info-circle",
          id: "#tabs-icons-text-1",
        },
        {
          name: "Events",
          icon: "fa-calendar-alt",
          id: "#tabs-icons-text-2",
        },
      ]

      if (this.profiles != 0) {
        let teamItem = {
          name: "Team",
          icon: "fa-user",
          id: "#tabs-icons-text-3",
        }
        array.push(teamItem)
      }

      if (this.jobPositions != 0) {
        let jobItem = {
          name: "Jobs",
          icon: "fa-briefcase",
          id: "#tabs-icons-text-4",
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

    primaryContact() {
      let primary = this.profiles.find((obj) => obj.primary == true)

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
          email: this.office.acf.email,
          url: this.office.acf.url,
          phone: this.office.acf.phone,
        }
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
      // heroImage: (state) => state.heroImages,
    }),
  },

  async created() {
    this.department_category_id = this.categoryMap[
      this.$route.params.department
    ]
    this.office_tag_id = this.tags[this.$route.params.office]

    if (this.office && this.office.media_url !== 0) {
      let heroobj = await fetch(
        this.$config.apiUrl + "media/" + this.office.media_url
      )
        .then((response) => response.json())
        .catch((error) => error.response.status)
      this.image_url = heroobj.guid.rendered
    } else {
      this.image_url =
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg"
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
