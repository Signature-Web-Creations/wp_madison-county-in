<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader image="default" />
    <v-container fluid>
      <v-row class="d-flex flex-md-row justify-center py-10 px-3">
        <v-col cols="12" lg="7" class="mb-3">
          <h1>Madison County Events</h1>
        </v-col>
        <v-col cols="12" lg="7" class="mb-3">
          <BaseEventList
            :events="eventList"
            :showFilters="filters"
            type="general"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    filters: true,
  }),

  async asyncData({ store }) {
    const eventList = await store.dispatch("wuapi/getEvents", {
      limit: "500",
      type: "latest",
      returnValue: true,
    })

    return { eventList }
  },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
