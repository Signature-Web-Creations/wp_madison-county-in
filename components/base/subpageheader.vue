<template>
  <v-sheet
    :class="!showImage ? 'primary' : 'grey lighten-3'"
    :style="
      !showImage
        ? 'height: 15vh; min-height: 250px;'
        : 'height: 20vh; min-height: 300px; background-image: url(' +
          this.setImage(this.image) +
          ');'
    "
  >
    <v-container>
      <v-row class="fill-height justify-left align-content-center pa-10">
        <v-col cols="12">
          <h1
            v-if="showTitle"
            class="display-2 lightgrey--text text-center pt-15"
            v-html="title"
          ></h1>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: null,
    },
    showImage: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: false,
    },
  },

  methods: {
    setImage(imageObject) {
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
