<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader
      v-if="organization.listing_image"
      :image="organization.listing_image"
      :name="organization.name"
    />
    <!-- Content -->
    <v-container fluid>
      <v-row class="d-flex flex-md-row justify-center pb-10 pt-15 px-3">
        <v-col cols="12" lg="7" class="mb-3">
          <div class="">
            <div class="detail-tile mb-4">
              <div class="d-flex flex-row mb-6 align-center">
                <v-img
                  class="mr-4"
                  v-if="organization.organization_image"
                  :src="organization.organization_image"
                  contain
                  max-width="150"
                />
                <div>
                  <h1 v-html="organization.name" />
                  <p
                    class="text-muted"
                    v-html="
                      organization.address +
                      '<br />' +
                      organization.city +
                      ', ' +
                      organization.state +
                      ', ' +
                      organization.zip
                    "
                  />
                </div>
              </div>
              <v-btn
                disabled
                rounded
                class="text-uppercase primary mr-2 mb-2"
                v-for="item in organization.categories"
                :key="item.name"
                small
              >
                {{ item.name }}
              </v-btn>
            </div>

            <BaseTabs
              :navigation="tabs"
              :item="organization"
              :listOfevents="listOfevents"
            />
          </div>
        </v-col>
        <v-col cols="12" lg="3" class="pt-md-16">
          <BaseSidebar
            :email="organization.email"
            :phone="organization.phone"
            :c_name="organization.name"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data() {
    return {
      tabs: [
        {
          name: "About",
          icon: "fa-info-circle",
        },
        // {
        //   name: "Related organizations",
        //   icon: "fa-calendar-alt",
        // },
      ],
    }
  },

  computed: mapState({
    categories: (state) => state.wuapi.organization_categories,
    listOfevents: (state) => state.wuapi.listOfevents,
  }),

  methods: mapActions("wuapi", ["getOrganization", "getDirectory"]),

  async asyncData({ store, route }) {
    // let organization = "test"
    // const organization = await store.dispatch("getCommunities", true)
    const organization = await store.dispatch(
      "wuapi/getOrganization",
      route.params.id
    )
    console.log("this the front", organization)

    //   let relatedCategories = ""
    //   this.organization.categories.forEach((element, index) => {
    //     relatedCategories += this.categories.find(
    //       (organization) => organization.name === element.name
    //     ).key
    //     if (index < this.organization.categories.length - 1) {
    //       relatedCategories += ","
    //     }
    //   })

    // let options = {
    //   type: "latest",
    //   limit: "5",
    //   organization_id: this.organization.id,
    //   categories: relatedCategories,
    // }
    // this.getEvents(options)

    return { organization }
  },
}
</script>
