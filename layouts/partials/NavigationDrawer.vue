<template>
  <v-navigation-drawer
    :value="drawer"
    @input="updateDrawer"
    fixed
    temporary
    right
    app
    width="290"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://madisoncounty.in.gov/images/recoloredlogo.png" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="title" v-text="location.county">
        </v-list-item-title>
        <v-list-item-subtitle v-text="location.state.name">
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link href="/">
        <v-list-item-icon>
          <v-icon dense>fas fa-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="isMobile" link to="/covid-19">
        <v-list-item-icon>
          <v-icon dense>fas fa-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Covid-19</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="link in menuItems"
        :key="link.name"
        link
        :to="link.url"
      >
        <v-list-item-icon>
          <v-icon dense>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        dense
        v-for="category in categorySections"
        :key="category.name"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon dense v-text="category.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="category.name" />
          </v-list-item-content>
        </template>

        <v-list-item
          class="pl-6"
          v-for="office in category.offices"
          :key="office.name"
          link
          :to="('/' + category.name + '/' + office.slug) | lowerCase"
        >
          <v-list-item-content>
            <v-list-item-title class="" v-html="office.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-for="item in wuSections"
        :key="item.name"
        link
        :href="item.url"
      >
        <v-list-item-icon>
          <v-icon dense>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon dense>fas fa-city</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>City/Township</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="city in communityList"
          :key="city.name"
          link
          :to="('/community/' + city.name) | lowerCase"
        >
          <v-list-item-content>
            <v-list-item-title>{{ city.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { generalMixin } from "~/mixins/general.js"

export default {
  name: "NavigationDrawer",

  mixins: [generalMixin],

  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      alloffices: [],
      menuItems: [
        {
          name: "About Us",
          url: "/about",
          icon: "fas fa-info-circle",
        },
        {
          name: "Live Public Meetings",
          url: "/public-meetings",
          icon: "fas fa-video",
        },
        {
          name: "Election Results",
          url: "/election-results",
          icon: "fas fa-vote-yea",
        },
      ],
      categorySections: [
        {
          name: "Government",
          url: "/#government",
          icon: "fas fa-university",
          offices: [],
        },
        {
          name: "Residents",
          url: "/#residents",
          icon: "fas fa-house-user",
          offices: [],
        },
      ],
      wuSections: [
        {
          name: "Events",
          url: "/events",
          icon: "fas fa-calendar-alt",
        },
        {
          name: "Directory",
          url: "/organizations",
          icon: "fas fa-folder-open",
        },
        {
          name: "Destinations",
          url: "/destinations",
          icon: "fas fa-star",
        },
      ],
      communityList: [
        { name: "Alexandria", url: "/community" },
        { name: "Anderson", url: "/community" },
        { name: "Chesterfield", url: "/community" },
        { name: "Edgewood", url: "/community" },
        { name: "Elwood", url: "/community" },
        { name: "Frankton", url: "/community" },
        { name: "Ingalls", url: "/community" },
        { name: "Lapel", url: "/community" },
        { name: "Markleville", url: "/community" },
        { name: "Orestes", url: "/community" },
        { name: "Pendleton", url: "/community" },
        { name: "Summitville", url: "/community" },
      ],
    }
  },

  async fetch({ store }) {
    await store.dispatch("getOffices")
  },

  computed: mapState({
    offices: (state) => state.offices,
    drawer: (state) => state.navigation.drawer,
  }),

  methods: {
    ...mapActions("navigation", ["updateDrawer"]),
    // ...mapActions("getOffices"),
    governmentOffices() {
      this.categorySections[0].offices = this.offices.filter(
        (offices) => offices.categories[0] === 5
      )
    },
    residentsOffices() {
      this.categorySections[1].offices = this.offices.filter(
        (offices) => offices.categories[0] === 15
      )
    },
  },

  created() {
    this.governmentOffices()
    this.residentsOffices()
  },
}
</script>

<style lang="scss" scoped></style>
