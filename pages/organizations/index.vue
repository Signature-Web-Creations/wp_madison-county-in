<template>
  <div class="main-wrapper">
    <BaseSubpageheader :showTitle="false" :image="image" :showImage="true" />
    <v-container fluid>
      <v-row class="d-flex flex-md-row justify-center py-10 px-3">
        <v-col cols="12" lg="7" class="mb-3">
          <h1>Madison County Directory</h1>
        </v-col>
        <v-col cols="12" lg="7" class="mb-3">
          <v-text-field
            v-if="showFilters"
            label="Search by name, city or zip"
            v-model="searchTerm"
            @input="directoryList = filterItems"
          >
            <v-icon slot="append" small>
              fa-search
            </v-icon>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="7" class="mb-3">
          <div>
            <v-list two-line>
              <v-list-item-group active-class="primary--text">
                <template v-for="(organization, index) in directoryList">
                  <v-list-item
                    :key="organization.id"
                    :to="{
                      name: 'organizations-id',
                      params: { id: organization.organization_id },
                    }"
                  >
                    <template>
                      <v-list-item-avatar size="100" tile>
                        <v-img
                          v-if="organization.organization_image"
                          :src="organization.organization_image"
                          contain
                        />
                        <v-img
                          v-else
                          :src="require('~/assets/logo-icon.png')"
                          height="80"
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-bold"
                          v-text="organization.name"
                        />
                        <div
                          v-text="organization.city + ', ' + organization.state"
                        />

                        <div
                          class="mt-2 font-weight-light"
                          v-html="organization.description"
                        />
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < directoryList.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default {
  data: () => ({
    active: [],
    searchTerm: "",
    directoryList: [],
    open: [],
    tab: null,
    filters: [
      {
        name: "By City",
        id: 0,
      },
      {
        name: "By Category",
        id: 1,
      },
    ],
    showFilters: {
      type: Boolean,
      default: true,
    },
    cityList: [],
    categoryList: [],
    items: undefined,
  }),

  async asyncData({ route, store }) {
    const organizationList = await store.dispatch("wuapi/getDirectory", {
      limit: "500",
      returnValue: true,
    })
    const data = await store.dispatch("getPageContent", route.name)
    const image = await store.dispatch(
      "getFeaturedImage",
      data === undefined || data.featured_media === 0 ? 0 : data.featured_media
    )

    return { organizationList, image }
  },

  computed: {
    filterItems() {
      if (this.searchTerm === "") {
        return this.organizationList
      } else {
        return this.organizationList.filter(
          (item) =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.zip.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        )
      }
    },
    categoryItems() {
      let array = []

      this.categoryList.forEach((element, index) => {
        let item = {
          name: element,
          id: index,
          children: [],
        }

        array.push(item)
      })

      return array
    },

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

    selected() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return this.organizationList.find(
        (organization) => organization.id === id
      )
    },
  },

  methods: {
    goTo() {
      const id = this.active[0]
      const organization = this.organizationList.find(
        (organization) => organization.id === id
      )

      this.$router.push({
        name: "organizations-id",
        params: { id: organization.organization_id },
      })
    },

    async fetchOrganizations(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      if (this.tab == 1) {
        return this.organizationList.filter((organization) => {
          organization.categories.forEach((category) => {
            if (category.name === item.name) {
              item.children.push(organization)
            }
          })
        })
      } else if (this.tab == 0) {
        item.children.push(
          ...this.organizationList.filter(
            (organization) => organization.city === item.name
          )
        )
      }

      return item.children
    },

    // setFilter(id) {
    //   if (id === 0) {
    //     this.items = this.cityItems
    //   } else if (id === 1) {
    //     this.items = this.categoryItems
    //   }
    // },

    // updateOrganizationList(array) {
    //   this.open = array
    // },

    getCategoryList() {
      let array = []

      this.organizationList.forEach((organization) => {
        organization.categories.forEach((category) => {
          array.push(category.name)
        })
      })

      array.sort((a, b) => {
        return a.localeCompare(b)
      })

      this.categoryList = new Set(array)
    },

    // getCityList() {
    //   let array = []

    //   this.organizationList.forEach((element) => {
    //     if (element.city != "") {
    //       let city = element.city.toLowerCase()
    //       city = this.capitalizeWords(city)
    //       array.push(city)
    //     }
    //   })

    //   array.sort((a, b) => {
    //     return a.localeCompare(b)
    //   })

    //   this.cityList = new Set(array)
    // },
    // searchList() {
    //   this.organizationList = this.filterItems
    // },

    capitalizeWords(string) {
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase()
      })
    },
  },

  created() {
    this.directoryList = this.filterItems
    // this.getCityList()
    // this.getCategoryList()
    // this.setFilter(0)
  },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
