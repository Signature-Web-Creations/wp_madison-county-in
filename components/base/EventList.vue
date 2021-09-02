<template>
  <div>
    <v-row v-if="showFilters">
      <v-col cols="12" sm="6">
        <v-text-field label="Search" v-model="searchTerm">
          <v-icon slot="append" small>
            fa-search
          </v-icon>
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            >
              <v-icon slot="append" small>
                fa-calendar-day
              </v-icon>
            </v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-list two-line>
      <v-list-item-group active-class="primary--text">
        <template v-for="(event, index) in displayedItems">
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

          <v-divider v-if="index < events.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "city",
    },
  },

  data() {
    return {
      searchTerm: "",
      displayedItems: this.events,
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    }
  },

  watch: {
    date: "searchList",
    searchTerm() {
      if (this.searchTerm.length > 2) {
        this.searchList()
      } else if (this.searchTerm.length === 0) {
        this.displayedItems = this.events
      }
    },
  },

  computed: {
    filterItems() {
      if (this.searchTerm === "") {
        return this.events
      } else {
        return this.events.filter(
          (item) =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        )
      }
    },
  },

  methods: {
    async searchList() {
      if (this.type !== "city") {
        const eventsList = await this.getEvents({
          returnValue: true,
          search: this.searchTerm,
          dateFrom: this.date,
          type: "latest",
          limit: 200,
        })
        this.displayedItems = eventsList
      } else {
        this.displayedItems = this.filterItems
      }
    },
    ...mapActions("wuapi", ["getEvents"]),
  },
}
</script>

<style lang="scss" scoped></style>
