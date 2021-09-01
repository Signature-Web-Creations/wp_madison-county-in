<template>
  <v-sheet
    class="theme--light grey lighten-3"
    style="height: 20vh; min-height: 300px;"
    :style="
      image != ''
        ? 'background-image: url(' + image + ');'
        : 'background-image: url(' + setDefault + ');'
    "
  >
    <v-overlay absolute style="margin: 0; z-index: 0;">
      <v-container>
        <v-row class="fill-height justify-left align-content-center pa-10">
          <v-col cols="12">
            <!-- <h1
              class="display-2 lightgrey--text text-left"
              v-html="office.name"
            ></h1> -->
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-sheet>
</template>

<script>
import { mapState } from "vuex"

export default {
  props: {
    image: {
      type: String,
      default: "",
    },
  },

  computed: {
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
</script>

<style lang="scss" scoped>
.v-sheet.theme--light.grey.lighten-3 {
  background-size: cover;
  background-position: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    color: #efefef;
    left: 0;
    top: 0;
  }
}
</style>
