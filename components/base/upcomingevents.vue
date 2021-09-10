<template>
  <div id="events" class="lightgrey pb-10">
    <div class="d-flex justify-space-around mt-8 mb-10 pt-8 pb-5">
      <h2 class="head-line display-3 h2 text-center blackish--text">
        <small class="top-subheader primary--text text-left">
          How to Stay Engaged
        </small>
        <br />Upcoming Events
      </h2>
    </div>

    <v-container :fluid="sizeContainer" class="px-md-10 px-xl-0">
      <v-row class="row d-flex justify-space-between">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="event in upcomingEventList"
          :key="event.id"
        >
          <v-card
            class="card card-lift--hover shadow border-0"
            :to="{ name: 'events-id', params: { id: event.id } }"
          >
            <v-img
              v-if="event.image"
              height="250"
              class="img-fluid"
              :src="event.image"
              :alt="event.name"
            />
            <v-img
              v-else
              height="250"
              class="img-fluid"
              :src="require('~/assets/wu-logo-fb.png')"
              :alt="event.name"
            />

            <v-card-title class="font-weight-normal event_name">
              {{ event.name }}
            </v-card-title>
            <v-card-subtitle v-html="event.host_organization" />
            <v-card-text class="card-body text-left py-4">
              <p class="font-weight-medium">
                {{ event.start | formatDate("DD MMMM YYYY") }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  async fetch() {
    let options = {
      type: "latest",
      limit: "6",
      categories: "18,7,11,9,6,3,4,16",
    }
    await this.getEvents(options)
  },

  computed: {
    upcomingEventList() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return this.latestEvents.slice(0, 4)
        case "md":
          return this.latestEvents.slice(0, 3)
        case "lg":
          return this.latestEvents.slice(0, 4)
        case "xl":
          return this.latestEvents
      }
    },

    sizeContainer() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
        case "lg":
          return true
        case "xl":
          return false
      }
    },

    ...mapState({
      latestEvents: (state) => state.wuapi.latestEvents,
    }),
  },

  methods: mapActions("wuapi", ["getEvents"]),
}
</script>

<style lang="scss" scoped>
h2 {
  small {
    font-size: 2rem;
  }
}
.event_name {
  word-break: break-word !important;
}
// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   font-weight: 700 !important;
// }
.h5,
h5 {
  font-size: 1.25rem;
}
.lead {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.7;
}
.sub-title {
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 10px;
  padding-bottom: 0;
  font-weight: 300;
}
</style>
