<template>
  <div>
    <BaseSubpageheader />
    <v-container class="pt-15 pb-15">
      <v-row>
        <v-col cols="12">
          <h1 v-html="title" />
          <div v-html="content" class="pt-5" />
          <article class="pt-15">
            <h2 v-html="report.title.rendered" class="pb-5"></h2>
            <marquee
              behavior="scroll"
              direction="up"
              scrollamount="3.5"
              loop="true"
              height="800"
            >
              <pre>
                <code v-html="report.acf.content"></code>
              </pre>
            </marquee>
          </article>
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
    const title = data.title.rendered

    const activeReportTagID = 64
    const report = await store.dispatch(
      "getActiveElectionReport",
      activeReportTagID
    )
    return { content, title, report }
  },
}
</script>

<style lang="scss" scoped>
marquee {
  background: $color__background-body;
  code {
    margin: 0 auto;
    background-color: transparent !important;
    font-size: 20px;
  }
}
</style>
