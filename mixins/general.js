import { mapState } from "vuex"

export const generalMixin = {
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return true
        case "md":
        case "lg":
        case "xl":
          return false
      }
    },

    setDefault() {
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
    },

    ...mapState({
      defaultImage: (state) => state.defaultImage,
    }),
  },
}
