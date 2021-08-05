<template>
  <v-navigation-drawer
    fixed
    permanent
    left
    width="33.66%"
    height="100vh"
    class="pt-5 blackish"
  >
    <div class="px-10">
      <nuxt-link
        class="d-flex text-decoration-none justify-center align-center flex-nowrap mb-5"
        :to="{ name: 'index' }"
      >
        <v-img
          class="mr-3"
          max-height="80"
          max-width="80"
          src="https://madisoncounty.in.gov/images/recoloredlogo.png"
        />

        <v-toolbar-title class="mr-16 text-decoration-none lightgrey--text">
          <strong>Madison County</strong><br />
          Indiana
        </v-toolbar-title>
      </nuxt-link>

      <v-divider></v-divider>

      <v-sheet class="blackish">
        <v-card-title
          class="lightgrey--text font-condensed text-h4 text-uppercase"
        >
          Office Contact
        </v-card-title>

        <v-list flat>
          <v-list-item class="lightgrey--text">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-user-circle
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="'Office Administrator'"
              />
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-phone
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="'1231234567'"
              />
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-envelope
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="'noreply@madisoncounty.in.gov'"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-sheet class="blackish mt-2" v-if="resources">
        <v-card-title
          class="lightgrey--text font-condensed text-h4 text-uppercase"
        >
          Resources
        </v-card-title>

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in resources"
              :key="item.id"
              :href="item.document.url"
              target="_blank"
            >
              <v-list-item-icon>
                <v-icon dense class="fa-fw lightgrey--text">
                  fa-file
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="lightgrey--text"
                  v-html="item.document.title"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
    </div>

    <template v-slot:append>
      <v-container fluid class="py-2 text-center footer-bottom">
        © Copyright 2017 Madison County Government
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    resources: Array,
  },
}
</script>

<style lang="scss" scoped>
.v-card__title {
  padding-top: 20px;
  padding-bottom: 5px;
}
.v-list-item:hover {
  background-color: #507f88;
}
.font-condensed {
  font-family: $font-condensed !important;
}
.footer-bottom {
  background-color: $color__background-button;
  color: $color__text-light;
}
</style>
