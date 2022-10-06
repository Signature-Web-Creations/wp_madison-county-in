<template>
  <div>
    <BaseSubpageheader
      :showTitle="titleHeader"
      :title="title"
      :image="image"
      :showImage="useImage"
    />
    <v-container>
      <v-row>
        <v-col>
          <v-tabs center v-model="tabs">
            <v-tab href="#governmentJobs">Government Jobs</v-tab>
            <v-tab href="#localJobs">Local Jobs</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item value="governmentJobs"
              ><iframe
                src="https://www.whatsup247.com/widgetsv2/get?id=88a493c823622a082270ecd8fc19d215"
                style="width: 100%; height: 800px; border: 0;"
              ></iframe
            ></v-tab-item>
            <v-tab-item value="localJobs"
              ><iframe
                src="https://www.whatsup247.com/widgetsv2/get?id=c2d6bb1b91c53b36adfb2cbaefc0b43a"
                style="width: 100%; height: 800px; border: 0;"
              ></iframe
            ></v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const data = await store.dispatch("getPageContent", route.name)
    const content = data.content.rendered
    const titleHeader = true
    const titleContent = data.format === "standard"
    const title = data.title.rendered
    const useImage = data.format === "standard"
    const image = await store.dispatch(
      "getFeaturedImage",
      data.featured_media !== 0 ? data.featured_media : 0
    )

    return { content, titleHeader, titleContent, title, useImage, image }
  },
  data() {
    return {
      tabs: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
