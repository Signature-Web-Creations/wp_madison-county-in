<template>
  <div>
    <v-row
      v-for="(category, index) in categories"
      :key="category.slug"
      :id="category.slug"
      class="flex-column-reverse ma-0"
      :class="{
        'flex-lg-row': index % 2 === 0,
        'flex-lg-row-reverse ': index % 2 !== 0,
        lightgrey: index % 5 === 0,
        secondary: index % 5 === 1,
        lightgrey: index % 5 === 2,
        hyperlink: index % 5 === 3,
      }"
      justify="center"
      align="center"
    >
      <v-col v-if="category.posts.length > 0" cols="12" lg="6" class="px-0">
        <v-container class="two-col-content pa-5 px-xl-6 mt-15 mt-lg-0">
          <v-sheet
            rounded
            shaped
            class="icon-section transparent text-center"
            :class="{
              'text-lg-left': index % 2 === 0,
              'text-lg-right': index % 2 !== 0,
            }"
          >
            <div
              class="mb-5 text-center"
              :class="{
                'text-lg-right': index % 2 !== 0,
                'text-lg-left': index % 2 === 0,
              }"
            >
              <h2
                class="section-name display-2 h2 mb-10 text-center"
                :class="{
                  'text-lg-left ml-lg-4': index % 2 === 0,
                  'text-lg-right mr-lg-4 lightgrey--text': index % 2 !== 0,
                }"
              >
                {{ category.name }}
              </h2>
            </div>

            <div
              class="px-sm-5 my-10 mb-lg-5"
              :class="{
                'text-lg-left': index % 2 === 0,
                'text-lg-right lightgrey--text': index % 2 !== 0,
              }"
              v-html="category.content"
            ></div>

            <div
              v-for="post in category.posts"
              :key="post.slug"
              class="d-inline-flex ma-4"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    width="100"
                    height="100"
                    elevation="2"
                    :to="'/' + category.slug + '/' + post.slug"
                  >
                    <v-img
                      :src="
                        'http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/' +
                        post.icon +
                        '.png'
                      "
                      width="100"
                      height="100"
                    />
                  </v-btn>
                </template>
                <span
                  class="white--text cardpost_h2_title pa-3"
                  v-html="post.name"
                />
              </v-tooltip>
            </div>
          </v-sheet>
        </v-container>
      </v-col>

      <v-col
        cols="12"
        lg="6"
        class="pa-0"
        :class="{
          'd-none d-lg-block d-xl-block': index === 0,
        }"
      >
        <v-sheet class="full-height transparent" elevation="0">
          <v-img
            height="100%"
            elevation="4"
            :src="itemImage(category.featured_media_sizes)"
            :aspect-ratio="setImageAspectRatio"
            cover
          ></v-img>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  computed: {
    setImageAspectRatio() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return 16 / 9
        case "lg":
        case "xl":
          return 961 / 762
      }
    },
  },

  methods: {
    itemImage(image) {
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
.row {
  padding-bottom: 50px;
  @media screen and (min-width: 1264px) {
    padding: 100px 0;
  }
}
.gray-background {
  background-color: #f2f2f2;
  .icon-section {
    background-color: #f2f2f2;
  }
}
.v-icon {
  font-size: 40px;
}
.section-name {
  font-size: 3rem;
}

.square-reveal {
  width: 256px;
  height: 256px;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
  }
  &::after {
    // content: '';
    position: absolute;
    background: rgba(149, 116, 215, 0.509);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60px;
    transition: transform 0.2s cubic-bezier(0, 0, 0.3, 1),
      opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
    transform: rotate(10deg);
    opacity: 0;
  }

  &:hover::after {
    transform: rotate(0deg);
    opacity: 1;
  }
}

.two-col-content {
  @media screen and (min-width: 1904px) {
    padding: 0 150px !important;
  }
  h2 {
    font-weight: 500 !important;
    &::after {
      bottom: -6px;
      width: 95%;
    }
  }
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
