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
        <v-img :src="require('~/assets/recoloredlogo.png')" />
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
        v-for="menuItem in filteredMenuItem"
        :key="menuItem.name"
        link
        :to="menuItem.url"
      >
        <v-list-item-icon>
          <v-icon dense>{{ menuItem.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        dense
        v-for="category in categorySections"
        :key="category.slug"
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
          :to="('/' + category.slug + '/' + office.slug) | lowerCase"
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
import { generalMixin } from "~/mixins/general"

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
          inMenu: true,
          isOffice: false,
        },
        {
          name: "County Council",
          url: "/county-council",
          icon: "fas fa-users",
          inMenu: false,
          isOffice: true,
        },
        {
          name: "Live Public Meetings",
          url: "/public-meetings",
          icon: "fas fa-video",
          inMenu: true,
          isOffice: false,
        },
        {
          name: "Election Results",
          url: "/election-results",
          icon: "fas fa-vote-yea",
          inMenu: true,
          isOffice: false,
        },
      ],
      categorySections: [
        {
          name: "Court & Legal",
          url: "/#legal",
          icon: "fas fa-balance-scale",
          slug: "legal",
          offices: [],
        },
        {
          name: "Government<br>Administration",
          url: "/#government",
          icon: "fas fa-university",
          slug: "government",
          offices: [],
        },
        {
          name: "Public Health",
          url: "/#public-health",
          icon: "fas fa-briefcase-medical",
          slug: "public-health",
          offices: [],
        },
        {
          name: "Public Safety",
          url: "/#public-Safety",
          icon: "fas fa-user-shield",
          slug: "public-Safety",
          offices: [],
        },
        {
          name: "Residential & <br> Support",
          url: "/#residents",
          icon: "fas fa-house-user",
          slug: "residentialsupport",
          offices: [],
        },
      ],
      wuSections: [
        {
          name: "Community Events",
          url: "/events",
          icon: "fas fa-calendar-alt",
        },
        {
          name: "Community Directory",
          url: "/organizations",
          icon: "fas fa-folder-open",
        },
        {
          name: "Community Destinations",
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
    filteredMenuItem() {
      let tempMenuitems = this.menuItems
      tempMenuitems = tempMenuitems.filter((menuItem) => {
        return menuItem.inMenu
      })
      return tempMenuitems
    },
  }),

  methods: {
    ...mapActions("navigation", ["updateDrawer"]),
    // ...mapActions("getOffices"),
    addRow(array, object) {
      array.push(object) // what to push unto the rows array?
    },
    appendOffices: function (categoryId, object) {
      let categoryArray = this.categorySections
      this.addRow(
        categoryArray[
          categoryArray.findIndex(
            (categoryArray) => categoryArray.slug === categoryId
          )
        ].offices,
        object
      )
    },
    filteredPost: function () {
      this.categorySections.forEach((categoryObject) => {
        categoryObject.offices.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
      })
    },
    governmentOffices() {
      this.categorySections[1].offices = this.offices.filter(
        (offices) => offices.categories[0] === 5
      )
    },
    judicialOffice() {
      this.categorySections[0].offices = this.offices.filter(
        (offices) => offices.categories[0] === 87
      )
    },
    publicSafetyOffice() {
      this.categorySections[3].offices = this.offices.filter(
        (offices) => offices.categories[0] === 85
      )
    },
    publicHealth() {
      this.categorySections[2].offices = this.offices.filter(
        (offices) => offices.categories[0] === 86
      )
    },
    residentsOffices() {
      this.categorySections[4].offices = this.offices.filter(
        (offices) => offices.categories[0] === 15
      )
    },
  },
  mounted: function () {
    this.appendOffices("government", this.menuItems[1])
    this.filteredPost()
  },
  created() {
    this.governmentOffices()
    this.residentsOffices()
    this.judicialOffice()
    this.publicHealth()
    this.publicSafetyOffice()
  },
}
</script>

<style lang="scss" scoped></style>
