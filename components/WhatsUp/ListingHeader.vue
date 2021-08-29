<template>
  <v-card class="theme--light grey lighten-3" :style="styleHeight">
    <v-img cover style="height: 100%;" :src="image" />
  </v-card>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped></style>
