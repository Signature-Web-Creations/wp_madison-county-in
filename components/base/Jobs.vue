<template>
  <v-expansion-panels focusable class="mt-5">
    <v-expansion-panel v-for="job in jobs" :key="job.id">
      <v-expansion-panel-header class="py-8">
        <template v-slot:default="{ open }">
          <h2>
            {{ job.title }}<br />
            <small class="text-subtitle-1">
              Posted:
              <em>{{ job.date | formatDate($moment, "MMMM D, YYYY") }}</em>
            </small>
          </h2>
          <v-spacer />
          <div class="text-right mr-5">
            <v-btn depressed :to="{ path: '/government/human-resources' }">
              Apply
            </v-btn>
          </div>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="mt-5" v-html="job.content" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
