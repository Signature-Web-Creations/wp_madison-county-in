<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    fixed
    temporary
    right
    app
    color="#426464"
  >
    <!-- color="#426464" -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title" v-text="location.county">
        </v-list-item-title>
        <v-list-item-subtitle v-text="location.state.name">
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in categories" :key="item.name" href>
        <v-list-item-icon>
          <v-icon>{{ categoryIcon(item.slug) }}</v-icon>
        </v-list-item-icon>

        <NuxtLink :to="{ path: '/', hash: item.slug }">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </NuxtLink>
      </v-list-item>
    </v-list>
    <v-list>
      <NuxtLink to="/directory">
        <v-list-item>
          <v-list-item-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Directory
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      cat_icon: {
        government: "mdi-bank",
        business: "mdi-handshake",
        residents: "mdi-homegroup ",
        visitors: "mdi-mapsearch"
      }
    };
  },

  computed: {
    categoryIcon(item) {
      return cat_icon[item];
    },
    ...mapState({
      drawer: state => state.navigation.drawer,
      miniVariant: state => state.navigation.miniVariant
    })
  }
};
</script>

<style lang="scss" scoped></style>