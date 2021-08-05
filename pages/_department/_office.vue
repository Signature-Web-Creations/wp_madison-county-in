<template>
  <v-sheet>
    <v-row justify="end">
      <v-col cols="4">
        <BaseLeftPanel :resources="office.acf.two_column_layout[3].resoures" />
      </v-col>
    </v-row>
    <v-row justify="end" class="ma-0">
      <v-col cols="8" class="pa-0 ma-0">
        <BaseSubpageheader :office="office" />
        <div class="nav-wrapper">
          <v-tabs
            grow
            v-model="tab"
            class=""
            id="tabs-icons-text"
            role="tablist"
            background-color="blueish"
            color="lightgrey"
            slider-color="blue-grey darken-2"
            slider-size="5"
          >
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
              :id="
                index === 0
                  ? `tabs-icons-text-${index + 1}-tab active show`
                  : `tabs-icons-text-${index + 1}-tab`
              "
              class="lightgrey--text"
              data-toggle="tab"
              :href="`#tabs-icons-text-${index + 1}`"
              role="tab"
              :aria-controls="`tabs-icons-text-${index + 1}`"
              :aria-selected="index === 0 ? 'true' : 'false'"
            >
              <i :class="`fa ${tab.icon} mr-2`"></i>{{ tab.name }}
            </v-tab>
          </v-tabs>
        </div>

        <div class="tab-content" id="eventTabContent">
          <v-tabs-items v-model="tab">
            <v-tab-item id="tabs-icons-text-1" :style="adjustWidth">
              <v-container>
                <h1 v-html="office.name"></h1>
                <section
                  v-for="row in office.acf.two_column_layout"
                  :key="row.services"
                >
                  <v-row>
                    <v-col cols="12" class="mt-1">
                      <h2 v-html="row.two_column_header" />
                      <div class="mt-2" v-html="row.services" />
                    </v-col>
                  </v-row>
                </section>
              </v-container>
            </v-tab-item>

            <v-tab-item id="tabs-icons-text-2" :style="adjustWidth">
              <v-container class="tab-pane fade px-md-16">
                <h1 v-html="office.name + ' Events'"></h1>
                <BaseEventList :events="listOfEvents" />
              </v-container>
            </v-tab-item>
            <v-tab-item id="tabs-icons-text-3" :style="adjustWidth">
              <v-container class="tab-pane fade px-md-16">
                <h1 v-html="office.name + ' Team'"></h1>
                <BaseTeam :team="profiles" :title="office.name" />
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState } from "vuex"

export default {
  layout: "office",

  data: () => ({
    collapseOnScroll: true,
    category_id: "",
    tag_id: "",
    tab: null,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    tabs: [
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
    ],
  }),

  async fetch({ store }) {
    await store.dispatch("getOffices")
    await store.dispatch("getCategories")
    await store.dispatch("getTags")
    await store.dispatch("getCountyProfiles")

    let options = {
      type: "latest",
      limit: "20",
    }
    await store.dispatch("wuapi/getEvents", options)
  },

  computed: {
    office() {
      let array = this.offices.filter(
        ({ categories, tags, slug }) =>
          categories.includes(this.category_id) &&
          tags.includes(this.tag_id) &&
          slug
      )

      return array[0]
    },

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.category_id) && tags.includes(this.tag_id)
      )
    },

    adjustWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return "padding: 40px 0px;"
        case "lg":
        case "xl":
          return "padding: 40px 150px;"
      }
    },

    ...mapState({
      offices: (state) => state.offices,
      listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      tags: (state) => state.tags,
    }),
  },
  // methods: mapActions("wuapi", ["getEvent", "getEvents"]),

  async created() {
    this.category_id = this.categoryMap[this.$route.params.department]
    this.tag_id = this.tags[this.$route.params.office]
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
