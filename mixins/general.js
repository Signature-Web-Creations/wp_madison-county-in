export const generalMixin = {
  computed: {
    mobile() {
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
  },
}
