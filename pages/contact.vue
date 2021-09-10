<template>
  <div>
    <BaseSubpageheader
      :showTitle="titleHeader"
      :title="title"
      :image="image"
      :showImage="useImage"
    />
    <v-container class="pt-15 pb-15">
      <v-row>
        <v-col cols="12">
          <h1 v-html="title" />
          <div v-html="content" class="pt-5" />

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Phone
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in profiles" :key="item.name">
                  <td>
                    <strong v-html="item.title" />
                    <br />
                    <em v-html="item.tags.name" />
                  </td>
                  <td>{{ item.phone | formatPhone }}</td>
                  <td>
                    <a :href="`mailto:${item.email}`">{{ item.email }}</a>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const profiles = await store.dispatch("getCountyPrimaryProfiles", {
      returnValue: true,
    })
    let options = { getPrimary: true }
    const tags = await store.dispatch("getTags", options)
    const data = await store.dispatch("getPageContent", route.name)
    const content = data.content.rendered
    const title = data.title.rendered
    const titleHeader = data.format === "aside"
    const titleContent = data.format === "standard"
    const useImage = data.format === "standard"
    const image = await store.dispatch(
      "getFeaturedImage",
      data.featured_media !== 0 ? data.featured_media : 0
    )

    return {
      content,
      titleHeader,
      titleContent,
      title,
      useImage,
      image,
      profiles,
      tags,
    }
  },

  computed: {},
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
