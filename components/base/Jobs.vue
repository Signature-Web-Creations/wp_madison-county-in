<template>
  <v-expansion-panels focusable class="mt-5">
    <v-expansion-panel v-for="job in jobs" :key="job.id">
      <v-expansion-panel-header class="py-8">
        <template v-slot="{ open }">
          <h2>
            {{ job.title }}<br />
            <small class="text-subtitle-1">
              Posted:
              <em>{{ job.date | formatDate($moment, "MMMM D, YYYY") }}</em>
            </small>
          </h2>
          <!-- <v-spacer />
          <div class="text-right mr-5">
            <v-btn
              depressed
              :to="{ path: '/government/human-resources' }"
              @click="open = false"
            >
              Apply
            </v-btn>
          </div> -->
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

<style lang="scss" scoped>
.v-expansion-panels {
  z-index: 0;
}
h2 {
  font-size: 20px !important;
  font-weight: 500 !important;
  &::after {
    background: none;
  }
  small {
    text-transform: uppercase;
    em {
      text-transform: capitalize;
    }
  }
}
</style>
