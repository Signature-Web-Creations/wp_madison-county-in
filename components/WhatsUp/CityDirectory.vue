<template>
  <v-card>
    <v-card-title class="primary white--text text-h5 mt-15">
      Madison County Directory
    </v-card-title>
    this is content
    {{ city }}
    <!-- <h1>CC</h1> -->
    {{ organizationList }}
  </v-card>
</template>

<script>
import { mapState } from "vuex"

export default {
  prop: {
    city: Object,
  },
  data: () => ({
    active: [],
    open: [],
    filters: [
      {
        name: "By Category",
        id: 1,
      },
      {
        name: "By City",
        id: 2,
      },
    ],
    selectedFilter: 0,
    cityList: this.,
    categoryList: [],
    items: undefined,
  }),

  async fetch({ store }) {
    let options = {
      limit: "500",
    }
    await store.dispatch("wuapi/getDirectory", options)
  },

  computed: {
    ...mapState({
      organizationList: (state) => state.wuapi.directory,
      categories: (state) => state.wuapi.directory_categories,
    }),
  },

  // methods: {
  //   CityOrganization() {
  //     this.cityOrganizationList = this.organizationList.filter(
  //       (organization) => {
  //         organization.name | (lowercase === this.community)
  //       }
  //     )
  //   },
  //   async fetchOrganizations(item) {
  //     // Remove in 6 months and say
  //     // you've made optimizations! :)
  //     await pause(1500)
  //     if (this.selectedFilter == 1) {
  //       this.organizationList.filter((organization) => {
  //         organization.categories.forEach((category) => {
  //           if (category.name === item.name) {
  //             item.children.push(organization)
  //           }
  //         })
  //       })
  //     } else if (this.selectedFilter == 2) {
  //       this.organizationList.filter((organization) => {
  //         if (organization.city === item.name) {
  //           item.children.push(organization)
  //         }
  //       })
  //     }
  //     return item.children
  //   },
  //   setFilter() {
  //     this.items = this.cityItems
  //     this.selectedFilter = id
  //   },
  //   updateOrganizationList(array) {
  //     this.open = array
  //   },
  //   getCategoryList() {
  //     let array = []
  //     this.organizationList.forEach((organization) => {
  //       organization.categories.forEach((category) => {
  //         array.push(category.name)
  //       })
  //     })
  //     array.sort((a, b) => {
  //       return a.localeCompare(b)
  //     })
  //     this.categoryList = new Set(array)
  //   },
  //   getCityList() {
  //     let array = []
  //     this.organizationList.forEach((element) => {
  //       if (element.city != "") {
  //         let city = element.city.toLowerCase()
  //         city = this.capitalizeWords(city)
  //         array.push(city)
  //       }
  //     })
  //     array.sort((a, b) => {
  //       return a.localeCompare(b)
  //     })
  //     this.cityList = new Set(array)
  //   },
  //   capitalizeWords(string) {
  //     return string.replace(/(?:^|\s)\S/g, function (a) {
  //       return a.toUpperCase()
  //     })
  //   },
  // },

  // created() {
  //   this.getCategoryList()
  //   this.getCityList()
  // },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
