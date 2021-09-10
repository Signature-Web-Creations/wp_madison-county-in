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
      :special="googleMaps"
    />
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
    const image = await store.dispatch(
      "getFeaturedImage",
      data.featured_media !== 0 ? data.featured_media : 0
    )
    const googleMaps = `
    <div class="responsive-embed">
      <iframe scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?hl=en&amp;ie=UTF8&amp;msa=0&amp;msid=105717021195828156110.000485dce9de04dbe530e&amp;ll=40.106929,-85.678983&amp;spn=0.013129,0.024676&amp;z=15&amp;output=embed" width="100%" height="500" frameborder="0"></iframe>
    </div>
    `

    return {
      content,
      titleHeader,
      titleContent,
      title,
      useImage,
      image,
      googleMaps,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
