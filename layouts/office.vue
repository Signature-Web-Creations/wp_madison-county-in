<template>
  <v-app>
    <v-main class="pt-0">
      <nuxt />
    </v-main>
    <NavigationDrawer :location="location" />
  </v-app>
</template>

<script>
import NavigationDrawer from "~/layouts/partials/NavigationDrawer"

export default {
  components: { NavigationDrawer },

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
    await this.$store.dispatch("setDefaultImage")
  },
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
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
