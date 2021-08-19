<template>
  <div>
    <BaseSubpageheader />
    <BaseStaticContent :content="content" :title="title" />
  </div>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const data = await store.dispatch("getPageContent", route.name)
    const content = data.content.rendered
    const title = data.title.rendered
    return { content, title }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
