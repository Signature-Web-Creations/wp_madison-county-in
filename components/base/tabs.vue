<template>
  <div>
    <div class="nav-wrapper">
      <v-tabs
        v-model="tab"
        class="nav nav-pills nav-fill flex-column flex-md-row"
        id="tabs-icons-text"
        role="tablist"
      >
        <v-tab
          v-for="(nav, index) in navigation"
          :key="nav.name"
          :id="
            index === 0
              ? `tabs-icons-text-${index + 1}-tab active show`
              : `tabs-icons-text-${index + 1}-tab`
          "
          class="nav-link mb-sm-3 mb-md-0"
          data-toggle="tab"
          :href="`#tabs-icons-text-${index + 1}`"
          role="tab"
          :aria-controls="`tabs-icons-text-${index + 1}`"
          :aria-selected="index === 0 ? 'true' : 'false'"
        >
          <i :class="`fa ${nav.icon} mr-2`"></i>{{ nav.name }}
        </v-tab>
      </v-tabs>
    </div>

    <v-card class="card shadow">
      <v-card-text class="card-body mt-5">
        <div class="tab-content" id="eventTabContent">
          <v-tabs-items v-model="tab">
            <v-tab-item id="tabs-icons-text-1">
              <div class="tab-pane fade active show">
                <p
                  v-if="!item.content || item.content === ''"
                  class="description"
                  v-html="item.description"
                />
                <p v-else class="description" v-html="item.content" />
              </div>
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
                          <v-list-item-avatar size="100" tile>
                            <v-img v-if="event.image" :src="event.image" />
                            <v-img
                              v-else
                              :src="require('~/assets/logo-icon.png')"
                              height="80"
                            />
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
          </v-tabs-items>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    listOfEvents: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      tab: null,
    }
  },
}
</script>
