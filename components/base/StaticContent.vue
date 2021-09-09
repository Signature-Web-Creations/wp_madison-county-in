<template>
  <v-container class="pt-15 pb-15">
    <v-row>
      <v-col cols="12">
        <h1 v-if="showTitle" v-html="title" />
        <div v-html="special" v-if="special != ''" class="pt-5" />
        <div v-html="content" class="pt-5" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      required: true,
    },
    special: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
