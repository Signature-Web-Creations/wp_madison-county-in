<template>

<v-card >
    <v-navigation-drawer
      absolute
      permanent
      floating
      left
      width="40vw"

    >
      <!-- <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template> -->

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-card>
  <!-- <div id="sideblock">
    <div class="content">
      <h2
        color="primary"
        class="lightgrey--text h2 ma-0 pa-0"
        :style="{
          'font-size': header2,
        }"
      >
        Welcome to Madison County
      </h2>

      <BaseEventCards />
    </div>
  </div> -->
</template>

<script>
import twoCol from './two-col.vue'
export default {
  components: { twoCol },}
</script>

<style lang="scss" scoped>
#sideblock {
  & > * {
    display: flex;
    align-items: center;
  }
  .content {
    background: #4299e1;
    width: 30vw;
    height: 100vh;
    .h2 {
      font-weight: 200;
    }
  }
}
</style>
