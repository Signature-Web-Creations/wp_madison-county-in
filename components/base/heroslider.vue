<template>
  <v-container fluid class="pa-0 fill-height ma-0 relative black">
    <v-carousel
      cycle
      hide-delimiters
      :show-arrows="false"
      width="100vw"
      min-width="320"
      height="100vh"
      interval="6000"
      v-model="carouselIndex"
      class="black"
    >
      <v-carousel-item
        hide-on-leave
        transition="slide-x-reverse-transition"
        reverse-transition="slide-x-transition"
        class="black"
        v-for="item in items"
        :key="item.id"
        width="100%"
        min-height="320"
        :style="{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 28%, rgba(0, 0, 0, 0) 100%), url(' +
            itemImage(item.acf.hero_image) +
            ')',
          'background-size': 'cover',
          'background-position': 'center',
        }"
      ></v-carousel-item>
    </v-carousel>

    <v-sheet
      class="header-wrap pl-5 pr-5 pl-md-16 pr-md-16 absolute"
      v-for="(post, index) in items"
      :key="post.id"
    >
      <v-slide-x-transition hide-on-leave>
        <h2
          color="primary"
          class="lightgrey--text h2 ma-0 pa-0"
          :style="{
            'font-size': header2,
          }"
          v-if="carouselIndex === index"
          v-html="post.acf.subheader"
        ></h2>
      </v-slide-x-transition>

      <v-slide-x-reverse-transition hide-on-leave>
        <h1
          color="primary"
          class="lightgrey--text ma-0 pa-0 mt-3"
          :style="header1"
          v-if="carouselIndex === index"
          v-html="post.title.rendered"
        ></h1>
      </v-slide-x-reverse-transition>

      <v-slide-x-transition hide-on-leave>
        <div
          class="lightgrey--text postcontent mr-10"
          v-if="carouselIndex === index"
          v-html="post.acf.hero_short_description"
        ></div>
      </v-slide-x-transition>
    </v-sheet>

    <BaseEventCards />
  </v-container>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      carouselIndex: 0,
    }
  },

  computed: {
    header2() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "30px"
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "62px"
      }
    },
    header1() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return {
            "font-size": "40px",
            "line-height": "1.07",
          }
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return {
            "font-size": "62px",
            "line-height": "1.1",
          }
      }
    },
  },

  methods: {
    itemImage(image) {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return image.sizes.medium_large
        case "sm":
          return image.sizes.large
        case "md":
          return image.sizes["post-thumbnail"]
        case "lg":
          return image.sizes["2048x2048"]
        case "xl":
          return image.url
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header-wrap {
  background: transparent;
  top: 30%;
  max-width: 1026px;
  display: flex;
  flex-direction: column;
  .h2 {
    font-weight: 200;
  }
}
.postcontent {
  width: inherit;
}
.relative {
  position: relative;
}
.v-carousel .v-window-item {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
