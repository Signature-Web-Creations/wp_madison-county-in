<template>
  <section id="welcome" class="overflow-hidden">
    <BaseHeroslider :items="slides" />
    <!-- <BaseIntrobar /> -->
    <BaseTwoCol />
    <BaseVisitorsect />
    <WhatsUpDestinations />
    <BaseUpcomingevents />
  </section>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 0,
    }
  },

  async asyncData({ $config }) {
    let homeSliderItems = await fetch(
      $config.apiUrl + "home_features"
    ).then((res) => res.json())
    const slides = homeSliderItems.map(({ acf, title, slug, yoast_head }) => ({
      acf,
      title,
      slug,
      yoast_head,
    }))

    return { slides }
  },

  async fetch() {
    await this.getLandingPages()
    await this.getOffices()
    await this.getCategories()
    await this.getFeaturedImages()
  },

  methods: mapActions([
    "getLandingPages",
    "getOffices",
    "getCategories",
    "getFeaturedImages",
  ]),
}
</script>

<style scoped></style>
