<template>
  <section id="welcome" class="overflow-hidden">
    <BaseHeroslider :items="slides" />
    <BaseTwoColumn :categories="posts" />
    <BaseVisitorSection />
    <WhatsUpDestinations :destinations="destinations" />
    <!-- <BaseUpcomingevents :events="events" /> -->
  </section>
</template>

<script>
import { generalMixin } from "~/mixins/general"
export default {
  mixins: [generalMixin],
  data() {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 0,
      organizedPosts: [],
      menuItems: [
        {
          name: "County Council",
          url: "/county-council",
          icon: "countycouncil",
        },
      ],
      // posts: [],
    }
  },
  methods: {
    addRow(array, object) {
      array.push(object) // what to push unto the rows array?
    },
    appendOffices: function (categoryId, object) {
      let postsArray = this.posts
      this.addRow(
        postsArray[
          postsArray.findIndex((postsArray) => postsArray.id === categoryId)
        ].posts,
        object
      )
    },
    filteredPost: function () {
      this.posts.forEach((postObject) => {
        postObject.posts.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
      })
    },
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
    // console.log(posts)
    // await store.dispatch("getFeaturedImages")

    const destinations = await store.dispatch("wuapi/getDestinations", {
      returnValue: true,
    })

    // const events = await store.dispatch("wuapi/getEvents", {
    //   type: "latest",
    //   limit: "6",
    //   categories: "18,7,11,9,6,3,4,16",
    //   returnValue: true,
    // })

    return { slides, posts, destinations, events }
  },
  mounted: function () {
    this.appendOffices(5, this.menuItems[0])
    this.filteredPost()
  },
}
</script>

<style scoped></style>
