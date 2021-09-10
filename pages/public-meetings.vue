<template>
  <div>
    <BaseSubpageheader :image="image" />
    <v-container class="pt-15 pb-15">
      <h1>Madison County Public Meetings</h1>
      <iframe
        src="https://madisoncoin.suiteonemedia.com/Web/Home.aspx"
        marginheight="0"
        marginwidth="0"
        name="plg_iframe"
        width="99%"
        height="1550"
        frameborder="0"
        align="middle"
        >No Frames</iframe
      >
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const image = await store.dispatch("getFeaturedImage", 0)

    return { image }
  },
}
</script>
ipt

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
