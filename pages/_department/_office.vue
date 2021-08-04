<template>
  <v-sheet>
    <v-row justify="end">
      <v-col cols="4">
        <v-navigation-drawer
          fixed
          permanent
          left
          width="33.66%"
          height="100vh"
          class="px-10 pt-16 blackish"
        >
          <v-sheet
            class="blackish"
            v-if="office.acf.two_column_layout[3].resoures"
          >
            <v-card-title class="lightgrey--text text-h4">
              Resources
            </v-card-title>
            <!-- {{ office.acf.two_column_layout[3].resoures }} -->
            <!-- <v-divider color="white" /> -->
            <v-list>
              <v-list-item-group
                v-model="selectedItem"
                class=""
                color="lightgrey"
              >
                <v-list-item
                  v-for="item in office.acf.two_column_layout[3].resoures"
                  :key="item.id"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      ><a
                        class="lightgrey--text text-decoration-none"
                        target="_blank"
                        v-html="item.document.title"
                        :href="item.document.url"
                        download
                      ></a
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-sheet>

          <v-sheet class="blackish">
            <v-card-title class="lightgrey--text text-h4"
              >Office Contact</v-card-title
            >
            <!-- {{ office.acf.two_column_layout[3].resoures }} -->
            <!-- <v-divider color="white" /> -->
            <v-list flat>
              <v-list-item class="lightgrey--text">
                <v-list-item-icon>
                  <v-icon dense class="fa-fw lightgrey--text">
                    fa-user-circle
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="lightgrey--text"
                    v-text="'Office Administrator'"
                  />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon dense class="fa-fw lightgrey--text">
                    fa-phone
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="lightgrey--text"
                    v-text="'1231234567'"
                  />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon dense class="fa-fw lightgrey--text">
                    fa-envelope
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="lightgrey--text"
                    v-text="'noreply@madisoncounty.in.gov'"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-navigation-drawer>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="8">
        <BaseSubpageheader :office="office" />
        <div class="nav-wrapper">
          <v-tabs
            grow
            v-model="tab"
            class=""
            id="tabs-icons-text"
            role="tablist"
            color="blueish"
            slider-color
            slider-size="3"
          >
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
              :id="
                index === 0
                  ? `tabs-icons-text-${index + 1}-tab active show`
                  : `tabs-icons-text-${index + 1}-tab`
              "
              class=""
              data-toggle="tab"
              :href="`#tabs-icons-text-${index + 1}`"
              role="tab"
              :aria-controls="`tabs-icons-text-${index + 1}`"
              :aria-selected="index === 0 ? 'true' : 'false'"
            >
              <i :class="`fa ${tab.icon} mr-2`"></i>{{ tab.name }}
            </v-tab>
          </v-tabs>
        </div>
        <div class="tab-content" id="eventTabContent">
          <v-tabs-items v-model="tab">
            <v-tab-item id="tabs-icons-text-1">
              <section
                v-for="(row, index) in office.acf.two_column_layout"
                :key="row.services"
                :class="{
                  'white blackish--text': index === 0,
                  'redish lightgrey--text': index % 5 === 1,
                  'white blackish--text': index % 5 === 2,
                }"
              >
                <v-container>
                  <v-row
                    class="d-flex flex-md-row flex-sm-column-reverse pa-10"
                    :class="{
                      'flex-md-row': index % 2 === 0,
                      'flex-md-row-reverse ': index % 2 !== 0,
                    }"
                  >
                    <v-col
                      class="mt-3 col-sm-12"
                      :class="{
                        'col-md-12':
                          row.two_col_image && row.two_col_image === false,
                        'col-md-6': row.two_col_image !== false,
                        'col-md-8':
                          row.resource_bar === true &&
                          row.two_col_image === false,
                      }"
                    >
                      <h2 v-html="row.two_column_header" />
                      <div class="mt-7" v-html="row.services" />
                    </v-col>

                    <v-col class="col-md-4 col-sm-12" v-if="row.resoures">
                      <v-sheet class="blueish" elevation="5">
                        <v-card-title class="lightgrey--text text-h4"
                          >Resources</v-card-title
                        >
                        <v-divider dark />
                        <v-list>
                          <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                          >
                            <v-list-item
                              v-for="item in row.resoures"
                              :key="item.id"
                            >
                              <v-list-item-content>
                                <v-list-item-title
                                  ><a
                                    class="text-decoration-none"
                                    target="_blank"
                                    v-html="item.document.title"
                                    :href="item.document.url"
                                    download
                                  ></a
                                ></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-sheet>
                    </v-col>
                    <v-divider
                      v-if="row.resoures"
                      class="d-sm-none"
                      vertical
                    ></v-divider>
                    <v-col
                      class="col-md-6 col-sm-12"
                      v-else-if="row.two_col_image"
                    >
                      <v-sheet elevation="5">
                        <v-img :src="row.two_col_image" max-height="700" />
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-container>
              </section>
            </v-tab-item>

            <v-tab-item id="tabs-icons-text-2">
              <div class="tab-pane fade">
                <v-list two-line>
                  <v-list-item-group active-class="primary--text">
                    <template v-for="(event, index) in listOfEvents">
                      <v-list-item
                        :key="event.id"
                        :to="{
                          name: 'events-id',
                          params: { id: event.id },
                        }"
                      >
                        <template>
                          <v-list-item-avatar
                            v-if="event.image"
                            size="100"
                            tile
                          >
                            <v-img :src="event.image" />
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              class="font-weight-bold"
                              v-text="event.name"
                            />

                            <v-list-item-subtitle class="mt-2 font-italic">
                              {{ event.start | formatDate($moment, "MMMM D") }}
                              at
                              {{ event.start | formatDate($moment, "h:mm a") }}
                            </v-list-item-subtitle>

                            <v-list-item-subtitle>
                              {{ event.city }},
                              {{ event.state }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < listOfEvents.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-tab-item>
            <v-tab-item id="tabs-icons-text-3">
              <div class="tab-pane fade">
                <BaseTeam />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  layout: "office",

  data: () => ({
    collapseOnScroll: true,
    category_id: "",
    tag_id: "",
    tab: null,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    tabs: [
      {
        name: "Overview",
        icon: "fa-info-circle",
      },
      {
        name: "Events",
        icon: "fa-calendar-alt",
      },
      {
        name: "Team",
        icon: "fa-users-alt",
      },
    ],
  }),

  async fetch({ store }) {
    await store.dispatch("getOffices")
    await store.dispatch("getCategories")
    await store.dispatch("getTags")
    await store.dispatch("getCountyProfiles")
  },

  computed: {
    office() {
      let array = this.offices.filter(
        ({ categories, tags, slug }) =>
          categories.includes(this.category_id) &&
          tags.includes(this.tag_id) &&
          slug
      )

      return array[0]
    },

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.category_id) && tags.includes(this.tag_id)
      )
    },

    ...mapState({
      offices: (state) => state.offices,
      listOfEvents: (state) => state.wuapi.latestEvents,
      categories: (state) => state.categories,
      categoryMap: (state) => state.categoryMap,
      countyProfiles: (state) => state.countyProfiles,
      tags: (state) => state.tags,
    }),
  },
  methods: mapActions("wuapi", ["getEvent", "getEvents"]),

  async created() {
    this.category_id = this.categoryMap[this.$route.params.department]
    this.tag_id = this.tags[this.$route.params.office]
  },
}
</script>

<style lang="scss" scoped>
.intro_bar {
  padding-top: 130px;
  .section__title {
    font-size: 40px;
  }
  .section__content {
    font-size: 28px;
  }
}
.h2 {
  font-size: 30px !important;
  font-weight: 400 !important;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #ead11b;
    bottom: -10px;
    left: 0;
  }
}
.rtl {
  direction: rtl;
}
.v-list-item:hover {
  background-color: #507f88;
}
.v-tabs-slider-wrapper {
  height: 5px !important;
}
.v-tabs-slider {
  border: 2px solid;
}
</style>
