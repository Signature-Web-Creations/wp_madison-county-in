<template>
  <footer app>
    <section class="footer-top">
      <v-container>
        <v-row no-gutters class="py-10" align-content="center">
          <v-col cols="12" md="6" class="py-5">
            <v-row align-content="center" justify="center">
              <v-col class="col-auto">
                <v-img
                  :src="require('~/assets/recoloredlogo.png')"
                  max-height="110"
                  max-width="110"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6" class="text-center text-md-left">
                <h4 class="text-uppercase">Madison County Government</h4>
                <p>
                  Madison County Government Center<br />
                  16 East 9th Street<br />
                  Anderson, IN 46016
                </p>
                <nuxt-link :to="{ name: 'map-directions' }">
                  Get Directions
                </nuxt-link>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="py-5 text-center text-md-left">
            <h4 class="text-uppercase">Help</h4>
            <div v-for="link in footerMenu" :key="link.name">
              <nuxt-link :to="link.url">{{ link.name }}</nuxt-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="footer-bottom">
      <v-container>
        <v-row no-gutters class="py-2 text-center text-md-left">
          <v-col cols="12" md="6" class="pb-4 pb-md-0">
            © Copyright {{ date | formatDate("YYYY") }} Madison County
            Government
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <span v-for="(link, index) in bottomBarLinks" :key="link.name">
              <nuxt-link :to="link.url">
                {{ link.name }}
              </nuxt-link>
              <span v-if="index + 1 < bottomBarLinks.length" class="mx-3">
                |
              </span>
            </span>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      bottomBarLinks: [
        {
          name: "Disclaimer",
          url: "/disclaimer",
        },
        {
          name: "Privacy",
          url: "/privacy-policy",
        },
        {
          name: "Jobs",
          url: "/government/human-resources",
        },
      ],
      footerMenu: [
        {
          name: "Contact Madison County",
          url: "/contact",
        },
        {
          name: "Find a County Service",
          url: "/contact",
        },
        {
          name: "Report a Problem",
          url: "/report",
        },
        {
          name: "Holiday Schedule",
          url: "/holiday-schedule",
        },
      ],
    }
  },

  computed: {
    changeWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "shrink-width-mobile mx-auto"
        case "md":
        case "lg":
        case "xl":
          return ""
      }
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  a {
    color: $color__text-light;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .footer-top {
    background-color: $color__text-main;
    color: $color__text-light;
    .shrink-width-mobile {
      width: 390px;
    }
  }

  .footer-bottom {
    background-color: $color__background-button;
    color: $color__text-light;
  }
}
</style>
