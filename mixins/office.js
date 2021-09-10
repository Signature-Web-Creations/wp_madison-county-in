import { mapState, mapActions } from "vuex"

export const officeMixin = {
  data() {
    return {
      drawer: false,
      tab: null,
    }
  },

  watch: {
    drawer(value) {
      this.updateDrawer(value)
    },
    stateDrawer(value) {
      this.drawer = value
    },
    "$route.path"(value) {
      this.updateBarClasses()
    },
  },

  computed: {
    getHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "200px"
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "300px"
      }
    },

    adjustWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return "padding: 40px 0px;"
        case "lg":
        case "xl":
          return "padding: 40px 150px;"
      }
    },

    adjustContentPadding() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "padding-top: 250px;"
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "padding-top: 375px;"
      }
    },

    ...mapState({
      stateDrawer: (state) => state.navigation.drawer,
    }),
  },

  methods: mapActions("navigation", ["updateDrawer"]),

  created() {
    this.updateDrawer(this.drawer)
  },
}
