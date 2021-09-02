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
      :contactInfo="primaryContact"
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
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),

  async asyncData({ store, route }) {
    // console.log("test 44")
    const offices = await store.dispatch("getOffices", true)
    const tags = await store.dispatch("getTags", true)

    let office_tag_id = tags[route.params.office]
    // console.log("tags:", tags)
    tags.forEach(({ id, slug }) => {
      if (route.params.office === slug) office_tag_id = id
    })

    const office = offices.filter(
      ({ tags, slug }) => tags.includes(office_tag_id) && slug
    )[0]
    console.log("_office.vue:57 ", office.organization_id)

    let listOfEvents = []
    if (office.organization_id) {
      console.log("_office.vue:61 ", office.organization_id)
      // listOfEvents = await store.dispatch("wuapi/getEvents", {
      //   returnValue: true,
      //   type: "latest",
      //   limit: "100",
      //   // search: "elections%20office",
      //   // search: office.name.toLowerCase(),
      //   // copromotion: "2",
      // })
      console.log(await store.dispatch("wuapi/getEvents"))
      const filteredEvents = listOfEvents.filter((events) => {
        console.log("_office.vue:69 Events Id =>", events.organization_id)
        // events.organization_id.trim() === office.organization_id.trim()
      })

      console.log("_office:69", filteredEvents)

      if (filteredEvents.length !== 0) {
        listOfEvents = filteredEvents
      }
    } else {
      listOfEvents = await store.dispatch("wuapi/getEvents", {
        returnValue: true,
        type: "latest",
        limit: "100",
      })
    }
    return {
      offices,
      office_tag_id,
      listOfEvents,
      office,
      tags,
    }
  },
  async fetch() {
    await this.$store.dispatch("getCategories")
    await this.$store.dispatch("getTags")
    await this.$store.dispatch("getCountyProfiles")
    await this.$store.dispatch("getJobsList")
  },
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

    // office() {
    //   let array = this.offices.filter(
    //     ({ categories, tags, slug }) =>
    //       categories.includes(this.department_category_id) &&
    //       tags.includes(this.office_tag_id) &&
    //       slug
    //   )
    //   // console.log("office array :99 -->", array)
    //   return array[0]
    // },

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
          fax: this.office.fax,
        }
      } else {
        return {
          title: "Office Administrator",
          email: this.office.acf.email,
          url: this.office.acf.url,
          phone: this.office.acf.phone,
          fax: this.office.fax,
        }
      }
    },

    setDefault() {
      const image = this.defaultImage.media_details.sizes
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return image.medium_large.source_url
        case "sm":
          return image.large.source_url
        case "md":
          return image["post-thumbnail"].source_url
        case "lg":
        case "xl":
          return image["2048x2048"].source_url
      }
    },

    ...mapState({
      // offices: (state) => state.offices,
      // listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      // tags: (state) => state.tags,
      listOfJobs: (state) => state.jobs,
      defaultImage: (state) => state.defaultImage,
    }),
  },

  async created() {
    // console.log("th",this.categoryMap[this.$route.params.department])
    this.department_category_id = this.categoryMap[
      this.$route.params.department
    ]
    // this.office_tag_id = this.tags[this.$route.params.office]

    if (this.office && this.office.media_url !== 0) {
      let heroobj = await fetch(
        this.$config.apiUrl + "media/" + this.office.media_url
      )
        .then((response) => response.json())
        .catch((error) => error.response.status)
      this.image_url = heroobj.guid.rendered
    } else {
      this.image_url = this.setDefault
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
