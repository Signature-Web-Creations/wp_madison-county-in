<template>
  <v-app>
    <NavigationDrawer :location="location" />
    <NavigationBar :location="location" />

    <v-main class="pt-0">
      <nuxt />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import NavigationDrawer from "~/layouts/partials/NavigationDrawer"
import NavigationBar from "~/layouts/partials/NavigationBar"
import Footer from "~/layouts/partials/Footer"

export default {
  components: { NavigationDrawer, NavigationBar, Footer },

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

  async fetch() {
    await this.$store.dispatch("getOffices")
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar.v-app-bar--is-scrolled {
  background-color: rgba(255, 255, 255, 0.3) !important;
  .blur-container {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: relative;
    top: 0;
    transform: translate3d(0, 0, 0);
  }
  .blur-content {
    filter: blur(1rem);
    left: 0px;
    top: 0px;
    transform: translateY(-447px);
    position: absolute;
    width: 100vw;
  }
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
