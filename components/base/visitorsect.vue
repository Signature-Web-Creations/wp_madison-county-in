<template>
  <v-parallax
    height="600"
    src="https://images.unsplash.com/photo-1573344176794-e7f9403f5a43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80"
    cover
    class="pa-0"
    id="visitors"
  >
    <v-overlay value="true" absolute opacity=".6">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8" xl="6">
            <h2 class="display-2 h2 mb-8">{{ pageData.title.rendered }}</h2>
            <p class="white--text mt-8 mb-6" v-html="pageData.acf.overview"></p>

            <v-btn
              id="visitorsbtn"
              color="blueish"
              class="ma-2 white--text"
              :href="pageData.acf.url"
              x-large
            >
              Learn More
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
      pageData: {},
    }
  },

  async fetch() {
    const office = await this.$axios.get(this.$config.apiUrl + "office/245")
    this.pageData = office.data
  },
}
</script>

<style lang="scss" scoped>
.overlay_parallax {
  position: absolute;
  opacity: 0.5 !important;
  left: 0;
}
// #visitorsbtn {
//   width: 150px;
// }

#visitors {
  p {
    font-size: 18px;
    @media screen and (min-width: 1904px) {
      font-size: 25px;
    }
    @media screen and (min-width: 960px) {
      font-size: 20px;
    }
  }
}
</style>
