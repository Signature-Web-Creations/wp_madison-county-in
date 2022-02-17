<template>
  <div
    class="absolute event-bar pl-5 pr-5 pl-md-16 pr-md-16"
    active-class="primary"
  >
    <v-row>
      <v-col
        v-for="event in eventList"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          elevation="2"
          class="event-card"
          :class="event.priority ? 'priority' : ''"
          height="100%"
          :to="{ name: 'events-id', params: { id: event.id } }"
        >
          <v-card-title class="pb-0 accent--text" v-html="event.name" />
          <v-card-subtitle
            class="font-italic mt-1 lightgrey--text"
            v-html="event.host_organization"
          />
          <v-card-text>
            <p>{{ event.start | formatDate("MMMM D") }}</p>
            <p class="mb-0">{{ event.description | truncateText(60) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data() {
    return {
      priorityEventId: "",
      communityeventLists: [],
    }
  },

  async fetch() {
    let options = {
      type: "featured",
      limit: "3",
      categories: "18,7,11,6,3,4,16",
    }
    await this.getEvents(options)
    await this.getPriorityEvent(this.priorityEventId)
  },

  computed: {
    eventList() {
      let events = this.featuredEvents.slice()

      if (this.priorityEvent) {
        events.unshift(this.priorityEvent)
      }

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return events.slice(0, 1)
        case "sm":
          return events.slice(0, 2)
        case "md":
        case "lg":
        case "xl":
          return events.slice(0, 3)
      }
    },
    ...mapState({
      featuredEvents: (state) => state.wuapi.featuredEvents,
      priorityEvent: (state) => state.wuapi.priorityEvent,
    }),
  },

  methods: mapActions("wuapi", ["getEvents", "getPriorityEvent"]),
}
</script>

<style lang="scss" scoped>
.event-bar {
  width: 100%;
  bottom: 5vh;
}

.event-card {
  background-color: rgba(4, 4, 4, 0.5);
  color: #fff;
  &.priority {
    background-color: rgba(80, 127, 136, 0.5);
  }
  .v-card__title {
    font-size: 17px;
    line-height: 1.2;
    word-break: break-word;
  }
  p {
    color: #fff;
    font-size: 14px;
  }
}
</style>
