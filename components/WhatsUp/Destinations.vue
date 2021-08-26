<template>
  <div id="destinations" class="pb-10">
    <div class="d-flex justify-space-around mt-8 mb-10">
      <h2 class="head-line display-3 h2 text-center blackish--text">
        <small class="top-subheader primary--text text-left">
          Don't know where to go?
        </small>
        <br />Let's Explore
      </h2>
    </div>

    <BaseDestinationsList :destinations="destinations" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  async fetch() {
    await this.getDestinations()
  },

  computed: mapState({
    destinations: (state) => state.wuapi.destinations,
  }),

  methods: mapActions("wuapi", ["getDestinations"]),
}
</script>

<style lang="scss" scoped>
h2 {
  small {
    font-size: 2rem;
  }
}
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: rgba(68, 100, 100, 0.75);
  padding: 10px;
}
.v-sheet.v-card {
  border-radius: 0;
}
</style>
