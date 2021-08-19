<template>
  <v-sheet
    class="theme--light grey lighten-3"
    style="height: 20vh; min-height: 300px;"
    :style="
      image != ''
        ? 'background-image: url(' + image + ');'
        : 'background-image: url(http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg);'
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
export default {
  props: {
    image: {
      type: String,
      default: "",
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
