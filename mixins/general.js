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

    async setDefault() {
      const imageObject = await this.$store.dispatch("getFeaturedImage", 0)
      const image = imageObject.media_details.sizes
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
  },
}
