<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader :image="destination.listing_image" />
    <!-- Content -->
    <v-container fluid>
      <v-row class="d-flex flex-md-row justify-center py-10 px-3">
        <v-col cols="12" lg="7" class="mb-3">
          <div class="">
            <div class="detail-tile mb-4">
              <h1 v-html="destination.name" />
              <p
                class="text-muted"
                v-html="
                  destination.address +
                  '<br/>' +
                  destination.city +
                  ' ' +
                  destination.state +
                  ', ' +
                  destination.zip
                "
              />
              <v-btn
                disabled
                rounded
                class="text-uppercase primary mr-2 mb-2"
                v-for="item in destination.categories"
                :key="item.name"
                small
              >
                {{ item.name }}
              </v-btn>
            </div>

            <BaseTabs
              :navigation="tabs"
              :item="destination"
              :listOfEvents="listOfEvents"
            />
          </div>
        </v-col>
        <v-col cols="13" lg="3" class="pt-md-16">
          <BaseSidebar
            :email="destination.email"
            :phone="destination.phone"
            :c_name="destination.name"
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
        {
          name: "Community Events",
          icon: "fa-calendar-alt",
        },
      ],
    }
  },

  computed: mapState({
    destination: (state) => state.wuapi.destination,
    listOfEvents: (state) => state.wuapi.latestEvents,
  }),

  methods: mapActions("wuapi", ["getDestination", "getDirectory", "getEvents"]),

  created() {
    this.getDestination(this.$route.params.id)

    let options = {
      type: "latest",
      limit: "5",
    }
    this.getEvents(options)
  },
}
</script>
