<template>
  <div>
    <BaseSubpageheader />
    <v-container class="pt-15 pb-15">
      <div>What are you searching for?</div>
      <v-radio-group v-model="radioGroup" row>
        <v-radio
          v-for="(n, index) in categories"
          :key="index"
          :label="n.label"
          :value="n"
          required
          @change="updateFilter(n)"
        ></v-radio>
      </v-radio-group>
      <form>
        <v-text-field
          v-model="textField"
          v-if="radioGroup"
          :rules="rules"
          label="Search"
          required
          v-on:keyup="changed(textField)"
        ></v-text-field>
      </form>
      <div v-if="content" class="mx-auto col-12">
        <v-list>
          <v-list-item-group
            v-model="listgroup"
            v-for="(item, i) in content"
            :key="i"
          >
            <v-list-item
              v-if="item.type === 'office' && item.categories[0] === 5"
              :to="'goverment/' + item.slug"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>
                <v-list-item-subtitle
                  class="mt-1 font-italic mb-4"
                  v-text="'Government'"
                />

                <v-list-item-subtitle
                  v-html="
                    $options.filters.truncateText(item.excerpt.rendered, 150)
                  "
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.type === 'community'"
              :to="'community/' + item.slug"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>
                <v-list-item-subtitle
                  class="mt-1 font-italic mb-4"
                  v-html="item.type"
                />
                <v-list-item-subtitle
                  v-html="
                    $options.filters.truncateText(item.excerpt.rendered, 150)
                  "
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.type === 'office' && item.categories[0] === 15"
              :to="'residents/' + item.slug"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>

                <v-list-item-subtitle
                  class="mt-1 font-italic mb-4"
                  v-text="'Residents'"
                />
                <v-list-item-subtitle
                  class=""
                  v-html="
                    $options.filters.truncateText(item.excerpt.rendered, 150)
                  "
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.media_type === 'file'"
              :href="item.guid.rendered"
            >
              <v-list-item-content>
                <v-list-item-title v-html="item.title.rendered">
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.mime_type" />
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else-if="item.type === 'profile'"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.title.rendered"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="mb-5"
                    v-text="item.acf.titlerole"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.acf.phone">
                <v-list-item-content>
                  <v-list-item-title class="mb-5">
                    {{ item.acf.phone | formatPhone }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.acf.email">
                <v-list-item-content link :href="`mailto:${item.acf.email}`">
                  <v-list-item-title
                    class="mb-5"
                    v-text="item.acf.email"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-item-group>
        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    listgroup: null,
    valid: true,
    radioGroup: null,
    textField: null,
    name: "",
    nameRules: [(v) => !!v || "Search term is required"],
    email: "",
    filter: "",
    itemfilter: {
      categories: [],
      tags: [],
    },
    content: null,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    categories: {
      documents: {
        label: "Documents",
        url: "media",
      },
      office: {
        label: "Offices",
        url: "office",
        category: {
          "5": "goverment",
          "15": "residents",
        },
      },
      form: {
        label: "Forms",
        url: "media",
      },
      people: {
        label: "People",
        url: "profile",
      },
      Community: {
        label: "Communities",
        url: "community",
      },
    },
  }),

  methods: {
    setCategory(e) {
      this.key = categories.office.category.e
    },
    updateFilter(filter) {
      this.filter = filter
    },
    async changed(searchinput) {
      this.name =
        this.$config.apiUrl +
        this.filter.url +
        "?per_page=100" +
        "&search=" +
        searchinput
      if (searchinput.length > 3) {
        this.content = await fetch(
          this.$config.apiUrl +
            this.filter.url +
            "?per_page=100" +
            "&search=" +
            searchinput
        ).then((res) => res.json())
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1185px;
}
</style>
