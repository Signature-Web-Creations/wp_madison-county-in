<template>
  <v-app-bar
    elevate-on-scroll
    app
    tile
    color="transparent"
    class="blur-primary-color"
    :class="barClasses"
    style="z-index: 2;"
    dark
  >
    <a
      class="d-flex text-decoration-none justify-center align-center flex-nowrap"
      href="/"
    >
      <v-img
        class="mr-3"
        max-height="45"
        max-width="45"
        src="https://madisoncounty.in.gov/images/recoloredlogo.png"
      />

      <v-toolbar-title
        class="mr-16 text-decoration-none"
        v-text="location.county + ', ' + location.state.abbrv"
      />
    </a>

    <v-spacer />

    <!-- <v-btn class="ml-16" icon>
      <v-icon small>fas fa-search</v-icon>
    </v-btn> -->

    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      <v-icon>fas fa-bars</v-icon>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      drawer: false,
      barClasses: "home",
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

  computed: mapState({
    stateDrawer: (state) => state.navigation.drawer,
  }),

  methods: {
    updateBarClasses() {
      if (this.$route.path == "/") {
        this.barClasses = "home"
      } else {
        this.barClasses = "not-home"
      }
    },
    ...mapActions("navigation", ["updateDrawer"]),
  },

  created() {
    this.drawer = this.stateDrawer
    this.updateBarClasses()
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 5) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  &.v-app-bar--is-scrolled {
    &.blur-primary-color {
      // background-color:rgba(68,100,100,.75) !important;
      // background-color: rgba(255, 255, 255, 0.75) !important;
      background: #fff !important;
      // backdrop-filter: blur(10px);
    }
    a,
    .v-icon {
      color: rgba(68, 100, 100) !important;
    }
  }
}

.v-application a {
  color: #fff;
}
.v-icon {
  color: #fff;
}
</style>
