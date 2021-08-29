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
      default:
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg",
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
