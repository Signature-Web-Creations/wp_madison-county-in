<template>
  <section id="welcome" class="overflow-hidden">
    <BaseHeroslider :items="slides" />
    <BaseTwoColumn :categories="posts" />
    <BaseVisitorSection />
    <WhatsUpDestinations :destinations="destinations" />
    <BaseUpcomingEvents :events="events" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 0,
    }
  },

  async asyncData({ $config, store }) {
    let homeSliderItems = await fetch(
      $config.apiUrl + "home_features"
    ).then((res) => res.json())
    const slides = homeSliderItems.map(({ acf, title, slug, yoast_head }) => ({
      acf,
      title,
      slug,
      yoast_head,
    }))

    await store.dispatch("getLandingPages")
    await store.dispatch("getOffices")
    await store.dispatch("getCategories")
    const posts = await store.dispatch("getCategoriesWithPosts", true)
    await store.dispatch("getFeaturedImages")

    const destinations = await store.dispatch("wuapi/getDestinations", {
      returnValue: true,
    })

    const events = await store.dispatch("wuapi/getEvents", {
      type: "latest",
      limit: "6",
      categories: "18,7,11,9,6,3,4,16",
      returnValue: true,
    })

    return { slides, posts, destinations, events }
  },
}
</script>

<style scoped></style>
