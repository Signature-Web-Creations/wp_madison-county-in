<template>
  <div>
    <BaseSubpageheader />
    <BaseStaticContent
      :content="content"
      :title="title"
      :special="googleMaps"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const data = await store.dispatch("getPageContent", route.name)
    const content = data.content.rendered
    const title = data.title.rendered
    const googleMaps = `
    <!-- Need to get Google Maps data from client -->
    <pre>Google Map API here</pre>
    `

    return { content, title, googleMaps }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
