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

    <v-btn v-if="!isMobile" large text tile to="/covid-19">
      <v-icon small>fas fa-plus</v-icon>&nbsp;&nbsp;Covid-19
    </v-btn>

    <v-btn to="/search" tile icon>
      <v-icon>fas fa-search</v-icon>
    </v-btn>

    <v-app-bar-nav-icon @click.stop="drawer = !drawer" tile>
      <v-icon>fas fa-bars</v-icon>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { generalMixin } from "~/mixins/general"

export default {
  mixins: [generalMixin],

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
      searchpanel: false,
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
    fetchData: function (query) {
      let tags = this.$store.dispatch("getTags", { search: query })
      tags.forEach((tag) => {
        fetch(
          this.$config.apiUrl + "&search=" + tagsoptions.search
        ).then((res) => res.json())
      })
    },
  },

  created() {
    this.updateDrawer(this.drawer)
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
      background: #fff !important;
    }
    a,
    .v-icon,
    .v-btn {
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
.v-btn {
  font-size: 16px;
}
</style>
