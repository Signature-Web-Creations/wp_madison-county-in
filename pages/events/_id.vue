<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader
      v-if="event.image"
      :image="event.image"
      :name="event.name"
    />
    <!-- Content -->
    <v-container fluid>
      <v-row
        class="d-flex flex-md-row justify-center flex-sm-column-reverse pa-10 pt-15"
      >
        <v-col cols="12" lg="7" class="mb-3">
          <div class="">
            <div class="detail-tile mb-4">
              <h1 v-html="event.name" />
              <em><p v-html="event.host_organization" /></em>
              <p
                class="text-muted"
                v-html="
                  event.address +
                  '<br />' +
                  event.city +
                  ', ' +
                  event.state +
                  ' ' +
                  event.zip
                "
              />
              <v-btn
                disabled
                rounded
                class="text-uppercase primary mr-2 mb-2"
                v-for="item in event.categories"
                :key="item.name"
                small
              >
                {{ item.name }}
              </v-btn>
            </div>

            <BaseTabs
              :navigation="tabs"
              :item="event"
              :listOfEvents="listOfEvents"
            />
          </div>
        </v-col>
        <v-col cols="12" lg="3" class="pt-md-16">
          <BaseSidebar
            :email="event.contact_email"
            :phone="event.contact_phone"
            :c_name="event.contact_name"
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
          name: "Related Events",
          icon: "fa-calendar-alt",
        },
      ],
    }
  },

  computed: mapState({
    categories: (state) => state.wuapi.event_categories,
    event: (state) => state.wuapi.event,
    listOfEvents: (state) => state.wuapi.latestEvents,
  }),

  methods: mapActions("wuapi", ["getEvent", "getEvents"]),

  async created() {
    await this.getEvent(this.$route.params.id)
    let relatedCategories = ""
    this.event.categories.forEach((element, index) => {
      relatedCategories += this.categories.find(
        (event) => event.name === element.name
      ).key
      if (index < this.event.categories.length - 1) {
        relatedCategories += ","
      }
    })

    let options = {
      type: "latest",
      limit: "5",
      categories: relatedCategories,
    }
    this.getEvents(options)
  },
}
</script>
