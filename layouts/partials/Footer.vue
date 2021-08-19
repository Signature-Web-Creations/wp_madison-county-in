<template>
  <footer app>
    <section class="footer-top">
      <v-container>
        <v-row no-gutters class="py-10" align-content="center">
          <v-col cols="12" md="6" class="py-5">
            <v-row align-content="center" justify="center">
              <v-col class="col-auto">
                <v-img
                  src="https://madisoncounty.in.gov/images/recoloredlogo.png"
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
                <a :to="{ path: '/directions' }">Get Directions</a>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="py-5 text-center text-md-left">
            <h4 class="text-uppercase">Help</h4>
            <div v-for="link in footerMenu" :key="link.name">
              <a :to="link.url">{{ link.name }}</a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="footer-bottom">
      <v-container>
        <v-row no-gutters class="py-2 text-center text-md-left">
          <v-col cols="12" md="6" class="pb-4 pb-md-0">
            © Copyright 2017 Madison County Government
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <span v-for="(link, index) in bottomBarLinks" :key="link.name">
              <a :to="link.url">
                {{ link.name }}
              </a>
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
          url: "/human-resources",
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
