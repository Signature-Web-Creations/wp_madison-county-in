<template>
  <div>
    <BaseLeftPanel
      :resources="office.acf.resources"
      :contactInfo="primaryContact"
    />

    <OfficeNavigation
      :tabs="tabs"
      :backgroundImage="image_url"
      :team="countyProfiles"
      :office="office"
      :jobs="jobPositions"
      :resources="office.acf.resources"
      :contactInfo="primaryContact"
    />
    <!-- :events="listOfEvents" -->
  </div>
</template>

<script>
import { mapState } from "vuex"
import OfficeNavigation from "~/layouts/partials/OfficeNavigation"
import { generalMixin } from "~/mixins/general"

export default {
  layout: "office",

  mixins: [generalMixin],

  components: { OfficeNavigation },

  data() {
    return {
      collapseOnScroll: true,
      // department_category_id: "",
      image_url: "",
      // office_tag_id: "",
      employment_tag_id: 30,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    }
  },

  async asyncData({ store, route }) {
    const offices = await store.dispatch("getOffices", true)
    let tagsoptions = { getPrimary: true }
    const tags = await store.dispatch("getTags", tagsoptions)

    let office_tag_id = tags[route.params.office]
    tags.forEach(({ id, slug }) => {
      if (route.params.office === slug) office_tag_id = id
    })

    const office = offices.filter(
      ({ tags, slug }) => tags.includes(office_tag_id) && slug
    )[0]

    const countyProfiles = await store.dispatch("getCountyProfiles", {
      categories: office.categories[0],
      tags: office.tags[0],
      returnValue: true,
    })

    // let listOfEvents = []
    // if (office.organization_id) {
    //   listOfEvents = await store.dispatch("wuapi/getEvents", {
    //     returnValue: true,
    //     type: "latest",
    //     limit: "100",
    //     search: office.name.toLowerCase(),
    //     copromotion: "2",
    //   })
    //   const filteredEvents = listOfEvents.filter((events) => {
    //     events.organization_id.trim() === office.organization_id.trim()
    //   })
    //   if (filteredEvents.length !== 0) {
    //     listOfEvents = filteredEvents
    //   }
    // } else {
    //   listOfEvents = await store.dispatch("wuapi/getEvents", {
    //     returnValue: true,
    //     type: "latest",
    //     limit: "100",
    //   })
    // }

    return {
      offices,
      office_tag_id,
      // listOfEvents,
      office,
      tags,
      countyProfiles,
    }
  },
  async fetch() {
    await this.$store.dispatch("getCategories")
    // await this.$store.dispatch("getTags")
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

      if (this.countyProfiles != 0) {
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

    department_category_id() {
      return this.categoryMap[this.$route.params.department]
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
      let primary = this.countyProfiles.find((obj) => obj.primary == true)

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

    ...mapState({
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      // countyProfiles: (state) => state.profiles,
      listOfJobs: (state) => state.jobs,
    }),
  },

  async created() {
    if (this.office && this.office.media_url !== 0) {
      let heroobj = await fetch(
        this.$config.apiUrl + "media/" + this.office.media_url
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
