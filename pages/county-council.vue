<template>
  <div>
    <BaseSubpageheader
      :showTitle="titleHeader"
      :title="title"
      :image="image"
      :showImage="useImage"
    />
    <BaseStaticContent
      :content="content"
      :showTitle="titleContent"
      :title="title"
    />
    <v-container>
      <BaseTeam :team="team" :title="title" :largeColumnSize="4" />
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const data = await store.dispatch("getPageContent", route.name)
    const content = data.content.rendered
    const titleHeader = data.format === "aside"
    const titleContent = data.format === "standard"
    const title = data.title.rendered
    const useImage = data.format === "standard"
    const team = await store.dispatch("getCountyProfiles", {
      categories: data.categories[0],
      tags: data.tags[0],
      returnValue: true,
    })


    const image = await store.dispatch(
      "getFeaturedImage",
      data.featured_media !== 0 ? data.featured_media : 0
    )

    return { content, titleHeader, titleContent, title, useImage, image, team, data }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
