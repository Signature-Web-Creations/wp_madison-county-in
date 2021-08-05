<template>
  <v-list two-line>
    <v-list-item-group active-class="primary--text">
      <template v-for="(event, index) in events">
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
              <v-list-item-title class="font-weight-bold" v-text="event.name" />

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
</template>

<script>
export default {
  props: {
    events: Array,
  },
}
</script>

<style lang="scss" scoped></style>
