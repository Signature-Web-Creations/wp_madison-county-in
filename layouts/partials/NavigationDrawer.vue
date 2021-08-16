<template>
  <v-navigation-drawer
    v-model="drawer"
    @input="updateDrawer"
    fixed
    temporary
    right
    app
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

      <v-list-item
        v-for="item in categorySections"
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
      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>City/Township</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="city in communityList"
          :key="city.name"
          link
          :to="('/community/' + city.name) | lowercase"
        >
          <!-- <v-list-item-icon>
          <v-icon dense>{{ item.icon }}</v-icon>
        </v-list-item-icon> -->

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

export default {
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      categorySections: [
        {
          name: "Government",
          url: "/#government",
          icon: "fas fa-university",
        },
        {
          name: "Business",
          url: "/#business",
          icon: "fas fa-handshake",
        },
        {
          name: "Residents",
          url: "/#residents",
          icon: "fas fa-house-user",
        },
        {
          name: "Visitors",
          url: "/#visitors",
          icon: "fas fa-map-marked-alt",
        },
      ],
      wuSections: [
        {
          name: "Events",
          url: "/#events",
          icon: "fas fa-calendar-alt",
        },
        {
          name: "Directory",
          url: "/directory",
          icon: "fas fa-folder-open",
        },
        {
          name: "Destinations",
          url: "/#destinations",
          icon: "fas fa-map-signs",
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
    let options = {
      limit: "500",
    }
    await store.dispatch("wuapi/getDirectory", options)
  },
  computed: {
    ...mapState({
      drawer: (state) => state.navigation.drawer,
      categories: (state) => state.categories,
      organizationList: (state) => state.wuapi.directory,
    }),

    cityItems() {
      let array = []
      this.cityList.forEach((element, index) => {
        let item = {
          name: element,
          id: index,
          children: [],
        }
        array.push(item)
      })
      return array
    },
  },

  methods: {
    async fetchOrganizations(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      if (this.selectedFilter == 1) {
        this.organizationList.filter((organization) => {
          organization.categories.forEach((category) => {
            if (category.name === item.name) {
              item.children.push(organization)
            }
          })
        })
      } else if (this.selectedFilter == 2) {
        this.organizationList.filter((organization) => {
          if (organization.city === item.name) {
            item.children.push(organization)
          }
        })
      }

      return item.children
    },
    getCityList() {
      let array = []

      this.organizationList.forEach((element) => {
        if (element.city != "") {
          let city = element.city.toLowerCase()
          city = this.capitalizeWords(city)
          array.push(city)
        }
      })

      array.sort((a, b) => {
        return a.localeCompare(b)
      })

      this.cityList = new Set(array)
    },
    capitalizeWords(string) {
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase()
      })
    },

    categoryIcon(item) {
      return this.cat_icon[item]
    },

    ...mapActions("navigation", ["updateDrawer"]),
  },
  created() {
    this.getCityList()
  },
  filters: {
    lowercase: function (value) {
      if (!value) return ""
      value = value.toString()
      return value.toLowerCase()
    },
  },
}
</script>

<style lang="scss" scoped></style>
