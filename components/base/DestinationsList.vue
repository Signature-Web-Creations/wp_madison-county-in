<template>
  <v-container
    :fluid="sizeContainer"
    :class="display === 'full' ? 'px-md-10 px-xl-0' : 'px-0'"
  >
    <v-row v-if="showFilters">
      <v-col cols="12">
        <v-text-field label="Search" v-model="searchTerm" @input="searchList">
          <v-icon slot="append" small>
            fa-search
          </v-icon>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="destination in displayedItems"
        :key="destination.id"
        cols="12"
        sm="6"
        :lg="display === 'full' ? '4' : '6'"
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
                  style="height: 35%;"
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
</template>

<script>
export default {
  props: {
    destinations: {
      type: Array,
      required: true,
    },
    display: {
      type: String,
      default: "full",
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchTerm: "",
      displayedItems: null,
    }
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

    filterItems() {
      if (this.searchTerm === "") {
        return this.destinations
      } else {
        return this.destinations.filter(
          (item) =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        )
      }
    },
  },

  methods: {
    searchList() {
      this.displayedItems = this.filterItems
    },
  },

  created() {
    this.displayedItems =
      this.display === "full" ? this.randomDestinations : this.destinations
  },
}
</script>

<style lang="scss" scoped>
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
