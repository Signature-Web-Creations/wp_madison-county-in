<template>
  <v-img
    :src="require('~/assets/logo.png')"
    :max-height="maxHeight"
    :max-width="maxWidth"
  ></v-img>
</template>

<script>
export default {
  props: {
    maxHeight: {
      type: String,
      default: "110",
    },
    maxWidth: {
      type: String,
      default: "110",
    },
  },
}
</script>

<style></style>
