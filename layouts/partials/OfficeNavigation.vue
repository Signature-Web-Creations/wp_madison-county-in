<template>
  <div>
    <v-app-bar
      absolute
      color="blueish"
      dark
      shrink-on-scroll
      prominent
      :src="backgroundImage"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques"
      :height="getHeight"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)"
        />
      </template>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>fas fa-bars</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:extension>
        <v-tabs
          grow
          v-model="tab"
          id="tabs-icons-text"
          role="tablist"
          background-color="blueish"
          color="lightgrey"
          slider-color="blue-grey darken-2"
          slider-size="5"
          align-with-title
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
            @click="$emit('update:tab', `tabs-icons-text-${index + 1}`)"
            :href="`#tabs-icons-text-${index + 1}`"
            role="tab"
            :aria-controls="`tabs-icons-text-${index + 1}`"
            :aria-selected="index === 0 ? 'true' : 'false'"
          >
            <i :class="`fa ${tab.icon} mr-2`"></i>{{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      height="100vh"
      style="padding-top: 400px;"
    >
      <v-container class="tab-content">
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
              <BaseEventList :events="events" />
            </v-container>
          </v-tab-item>

          <v-tab-item id="tabs-icons-text-3" :style="adjustWidth">
            <v-container class="tab-pane fade px-md-16">
              <h1 v-html="office.name + ' Team'"></h1>
              <BaseTeam :team="team" :title="office.name" />
            </v-container>
          </v-tab-item>

          <v-tab-item
            v-if="jobs.length != 0"
            id="tabs-icons-text-4"
            :style="adjustWidth"
          >
            <v-container class="tab-pane fade px-md-16">
              <h1>Open Positions</h1>
              <BaseJobs :jobs="jobs" />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    backgroundImage: {
      type: String,
      default:
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg",
    },
    events: Array,
    team: Array,
    office: Object,
    jobs: Array,
  },

  data() {
    return {
      drawer: false,
      tab: null,
    }
  },

  watch: {
    drawer(value) {
      this.updateDrawer(value)
    },
    stateDrawer(value) {
      this.drawer = value
    },
    "$route.path"(value) {
      this.updateBarClasses()
    },
  },

  computed: {
    getHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "300px"
      }
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
      stateDrawer: (state) => state.navigation.drawer,
    }),
  },

  methods: {
    ...mapActions("navigation", ["updateDrawer"]),
  },

  created() {
    this.drawer = this.stateDrawer
  },
}
</script>

<style lang="scss" scoped>
// .v-app-bar {
//   background: linear-gradient(
//     180deg,
//     rgba(0, 0, 0, 5) 0%,
//     rgba(0, 0, 0, 0.3) 50%,
//     rgba(0, 0, 0, 0) 100%
//   );
//   &.v-app-bar--is-scrolled {
//     &.blur-primary-color {
//       // background-color:rgba(68,100,100,.75) !important;
//       // background-color: rgba(255, 255, 255, 0.75) !important;
//       background: #fff !important;
//       // backdrop-filter: blur(10px);
//     }
//     a,
//     .v-icon {
//       color: rgba(68, 100, 100) !important;
//     }
//   }
// }

// .v-application a {
//   color: #fff;
// }
// .v-icon {
//   color: #fff;
// }
</style>
