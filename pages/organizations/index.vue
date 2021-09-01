<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader image="default" />
    <v-container fluid>
      <v-row class="d-flex flex-md-row justify-center py-10 px-3">
        <v-col cols="12" lg="7" class="mb-3">
          <h1>Madison County Directory</h1>
        </v-col>
        <v-col cols="12" lg="7" class="mb-3">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="primary"
            grow
          >
            <v-tab
              v-for="item in filters"
              :key="item.id"
              @click="setFilter(item.id)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="pt-5">
            <v-tab-item v-for="item in filters" :key="item.id">
              <v-card flat>
                <v-treeview
                  :active.sync="active"
                  :items="items"
                  :load-children="fetchOrganizations"
                  :open.sync="open"
                  :value="open"
                  activatable
                  color="primary"
                  open-on-click
                  transition
                  hoverable
                  @update:open="updateOrganizationList"
                  @update:active="goTo"
                >
                  <template v-slot:prepend="{ item }">
                    <v-img
                      v-if="!item.children"
                      :src="item.organization_image"
                      contain
                      width="50"
                      min-height="60"
                      class="py-3 mr-4"
                    />
                  </template>
                </v-treeview>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
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
    cityList: [],
    categoryList: [],
    items: undefined,
  }),

  async asyncData({ store }) {
    const organizationList = await store.dispatch("wuapi/getDirectory", {
      limit: "500",
      returnValue: true,
    })

    return { organizationList }
  },

  computed: {
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

    setFilter(id) {
      if (id === 0) {
        this.items = this.cityItems
      } else if (id === 1) {
        this.items = this.categoryItems
      }
    },

    updateOrganizationList(array) {
      this.open = array
    },

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
  },

  created() {
    this.getCityList()
    this.getCategoryList()
    this.setFilter(0)
  },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
