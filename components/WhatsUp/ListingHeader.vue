<template>
  <v-card class="theme--light grey lighten-3" :style="styleHeight">
    <v-img cover style="height: 100%;" :src="setImage" />
  </v-card>
</template>

<script>
import { mapState } from "vuex"

export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },

  computed: {
    styleHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "height: 25vh; min-height: 250px;"
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "height: 25vh; min-height: 500px;"
      }
    },
    setImage() {
      if (this.image === "") {
        return ""
      } else if (this.image === "default") {
        const image = this.defaultImage.media_details.sizes
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return image.medium_large.source_url
          case "sm":
            return image.large.source_url
          case "md":
            return image["post-thumbnail"].source_url
          case "lg":
          case "xl":
            return image["2048x2048"].source_url
        }
      } else {
        return this.image
      }
    },
    ...mapState({
      defaultImage: (state) => state.defaultImage,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
