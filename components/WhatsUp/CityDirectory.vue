<template>
  <div>
    <v-text-field
      v-if="showFilters"
      label="Search"
      v-model="searchTerm"
      @input="searchList"
    >
      <v-icon slot="append" small>
        fa-search
      </v-icon>
    </v-text-field>

    <v-list two-line>
      <v-list-item-group active-class="primary--text">
        <template v-for="(organization, index) in displayedItems">
          <v-list-item
            :key="organization.id"
            :to="{
              name: 'organizations-id',
              params: { id: organization.id },
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
                  class="mt-2 font-weight-light"
                  v-html="organization.description"
                />
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < directory.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    directory: {
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
      displayedItems: this.directory,
    }
  },

  computed: {
    filterItems() {
      if (this.searchTerm === "") {
        return this.directory
      } else {
        return this.directory.filter(
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

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
