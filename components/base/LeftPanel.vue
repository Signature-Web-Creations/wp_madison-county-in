<template>
  <v-navigation-drawer
    app
    :permanent="isPermanent"
    width="33.66%"
    class="pt-5 blackish"
  >
    <div class="px-10">
      <a
        class="d-flex text-decoration-none justify-center align-center flex-nowrap mb-5"
        href="/"
      >
        <v-img
          class="mr-3"
          max-height="80"
          max-width="80"
          :src="require('~/assets/recoloredlogo.png')"
        />

        <v-toolbar-title class="mr-16 text-decoration-none lightgrey--text">
          <strong>Madison County</strong><br />
          Indiana
        </v-toolbar-title>
      </a>

      <v-divider></v-divider>

      <v-sheet class="blackish">
        <v-card-title
          v-if="$route.path.toLowerCase().includes('community')"
          class="lightgrey--text font-condensed text-h4 text-uppercase"
        >
          Community Information
        </v-card-title>
        <v-card-title
          v-else
          class="lightgrey--text font-condensed text-h4 text-uppercase"
        >
          Office Contact
        </v-card-title>

        <v-list flat>
          <v-list-item class="lightgrey--text" v-if="contactInfo.title">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-user-circle
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="contactInfo.title"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="contactInfo.phone">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-phone
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="lightgrey--text">{{
                contactInfo.phone | formatPhone
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="contactInfo.fax">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-fax
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="lightgrey--text">{{
                contactInfo.fax | formatPhone
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="contactInfo.email">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-envelope
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="contactInfo.email"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item :href="contactInfo.url" v-if="contactInfo.url">
            <v-list-item-icon>
              <v-icon dense class="fa-fw lightgrey--text">
                fa-globe
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="lightgrey--text"
                v-text="contactInfo.url"
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
              :href="item.document.url || item.site_url.url"
              target="_blank"
            >
              <v-list-item-icon>
                <v-icon dense class="fa-fw lightgrey--text">
                  fa-file
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-if="item.document"
                  class="lightgrey--text"
                  v-html="item.document.title"
                />
                <v-list-item-title
                  v-else
                  class="lightgrey--text"
                  v-html="item.site_url.title"
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
    resources: [Array, Boolean],
    contactInfo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isPermanent() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return false
        case "md":
        case "lg":
        case "xl":
          return true
      }
    },
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
