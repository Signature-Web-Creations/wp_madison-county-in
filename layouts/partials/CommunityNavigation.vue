<template>
  <div>
    <v-app-bar
      absolute
      color="blueish"
      dark
      shrink-on-scroll
      prominent
      :src="backgroundImage"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques"
      :height="getHeight"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)"
        />
      </template>

      <a
        class="d-flex text-decoration-none justify-center align-center flex-nowrap d-md-none"
        href="/"
      >
        <v-img
          class="mr-3"
          max-height="45"
          max-width="45"
          :src="require('~/assets/recoloredlogo.png')"
        />

        <v-toolbar-title>
          Madison County, IN
        </v-toolbar-title>
      </a>

      <v-spacer></v-spacer>

      <v-btn v-if="!isMobile" class="ml-16" large text tile to="/covid-19">
        <v-icon small>fas fa-plus</v-icon>&nbsp;&nbsp;Covid-19
      </v-btn>

      <v-btn to="/search" tile icon>
        <v-icon>fas fa-search</v-icon>
      </v-btn>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>fas fa-bars</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:extension>
        <v-tabs
          grow
          v-model="tab"
          id="tabs-icons-text"
          role="tablist"
          background-color="blueish"
          color="lightgrey"
          slider-color="blue-grey darken-2"
          slider-size="5"
          show-arrows
        >
          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :id="
              index === 0
                ? `tabs-icons-text-${index + 1}-tab active show`
                : `tabs-icons-text-${index + 1}-tab`
            "
            class="lightgrey--text"
            data-toggle="tab"
            @click="$emit('update:tab', `tabs-icons-text-${index + 1}`)"
            :href="`#tabs-icons-text-${index + 1}`"
            role="tab"
            :aria-controls="`tabs-icons-text-${index + 1}`"
            :aria-selected="index === 0 ? 'true' : 'false'"
          >
            <i :class="`fa ${tab.icon} mr-2`"></i>{{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      height="100vh"
      :style="adjustContentPadding"
    >
      <v-container class="tab-content">
        <v-tabs-items v-model="tab">
          <v-tab-item id="tabs-icons-text-1" :style="adjustWidth">
            <v-container>
              <h1 v-html="community.name"></h1>
              <section>
                <v-row>
                  <v-col cols="12" class="mt-10">
                    <div v-html="community.content" />
                  </v-col>
                </v-row>
              </section>
            </v-container>
          </v-tab-item>

          <v-tab-item id="tabs-icons-text-2" :style="adjustWidth">
            <v-container class="tab-pane fade px-md-16">
              <h1 v-html="community.name + ' Events'"></h1>
              <BaseEventList
                :events="events"
                :showFilters="showFilters.destinations"
              />
            </v-container>
          </v-tab-item>

          <v-tab-item id="tabs-icons-text-3" :style="adjustWidth">
            <v-container class="tab-pane fade px-md-16">
              <h1 v-html="community.name + ' Destinations'"></h1>
              <BaseDestinationsList
                :destinations="destinations"
                display="city"
                :showFilters="showFilters.destinations"
              />
            </v-container>
          </v-tab-item>
          <v-tab-item id="tabs-icons-text-4" :style="adjustWidth">
            <v-container class="tab-pane fade px-md-16">
              <h1 v-html="community.name + ' Directory'"></h1>
              <WhatsUpCityDirectory
                :directory="directory"
                :showFilters="showFilters.directory"
              />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <BaseBottomNavigation
        :primaryContact="primaryContact"
        :docs="resources"
        class="d-md-none"
      />
    </v-sheet>
  </div>
</template>

<script>
import { generalMixin } from "~/mixins/general"
import { officeMixin } from "~/mixins/office"

export default {
  mixins: [generalMixin, officeMixin],

  props: {
    tabs: {
      type: Array,
      required: true,
    },
    resources: [Array, Boolean],
    backgroundImage: {
      type: String,
      default:
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/09/default.jpeg",
    },
    directory: Array,
    events: Array,
    destinations: Array,
    community: Object,
    primaryContact: Object,
  },

  data() {
    return {
      showFilters: {
        events: false,
        destinations: false,
        directory: true,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  &.v-app-bar--shrink-on-scroll {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 5) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    .v-toolbar__title {
      color: #fff;
      font-size: 1.25rem;
    }
  }
  &.v-app-bar--is-scrolled {
    background: none;
  }
}
</style>
