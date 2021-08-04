<template>
  <v-app>
    <NavigationDrawer :location="location" />
    <NavigationBar :location="location" />

    <v-main class="pt-0">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
import NavigationDrawer from "~/layouts/partials/NavigationDrawer"
import NavigationBar from "~/layouts/partials/NavigationBar"

export default {
  components: { NavigationDrawer, NavigationBar },

  data() {
    return {
      location: {
        county: "Madison County",
        state: {
          name: "Indiana",
          abbrv: "IN",
        },
      },
    }
  },

  computed: mapState(["categories"]),
}
</script>

<style lang="scss" scoped>
.v-app-bar.v-app-bar--is-scrolled {
  background-color: transparent !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
