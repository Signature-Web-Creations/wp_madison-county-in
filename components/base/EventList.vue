<template>
  <div>
    <v-row v-if="showFilters">
      <v-col cols="12" sm="6" md="4">
        <v-text-field label="Search" v-model="searchTerm" @input="searchList">
          <v-icon slot="append" small>
            fa-search
          </v-icon>
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4"> </v-col>
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
  },

  data() {
    return {
      searchTerm: "",
      displayedItems: this.events,
    }
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
    searchList() {
      this.displayedItems = this.filterItems
    },
  },
}
</script>

<style lang="scss" scoped></style>
