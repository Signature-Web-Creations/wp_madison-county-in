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

    <v-container :fluid="sizeContainer" class="px-md-10 px-xl-0">
      <v-row>
        <v-col
          v-for="destination in randomDestinations"
          :key="destination.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              color="grey lighten-4"
              max-width="600"
              :to="{ name: 'destinations-id', params: { id: destination.id } }"
            >
              <v-img :aspect-ratio="16 / 10" :src="destination.listing_image">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="transition-fast-in-fast-out v-card--reveal white--text"
                    style="height: 30%;"
                  >
                    <h3>{{ destination.name }}</h3>
                    <p>{{ destination.city }}, {{ destination.state }}</p>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  async fetch() {
    await this.getDestinations()
  },

  computed: {
    randomDestinations() {
      let array = []
      let arrayContainer = []
      const genNum = Math.floor(Math.random() * 20)
      arrayContainer.push(genNum)

      for (let counter = 0; counter < 9; counter++) {
        let newGen = Math.floor(Math.random() * 20)
        while (arrayContainer.lastIndexOf(newGen) !== -1) {
          newGen = Math.floor(Math.random() * 20)
        }
        arrayContainer.push(newGen)
        array.push(this.destinations[newGen])
      }

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return array.slice(0, 4)
        case "sm":
        case "md":
          return array.slice(0, 6)
        case "lg":
        case "xl":
          return array
      }

      return array
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
      destinations: (state) => state.wuapi.destinations,
    }),
  },

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
