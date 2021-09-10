<template>
  <div>
    <BaseSubpageheader />
    <v-container class="px-0" fluid>
      {{ radioGroup || null }}
      <v-radio-group v-model="radioGroup">
        <template v-slot:label>
          <div>What are you searching for?</div>
        </template>
        <v-radio
          v-for="(n, index) in categories"
          :key="index"
          :label="n.label"
          :value="n"
          required
          @change="updateFilter(n)"
        ></v-radio>
        <!-- @change="changed(n, '')" -->
      </v-radio-group>
      name:{{ name || null }}
      <br />
      text input: {{ textField || null }}
      <form>
        <v-text-field
          v-model="textField"
          v-if="radioGroup"
          :rules="rules"
          label="Name"
          required
          v-on:keyup="changed(textField)"
        ></v-text-field>
        <!-- @change="" -->
      </form>
      <v-card class="mx-auto" max-width="500">
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
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>
                <v-list-item-subtitle v-html="item.type" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.type === 'community'"
              :to="'community/' + item.slug"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>
                <v-list-item-subtitle v-html="item.type" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.type === 'office' && item.categories[0] === 15"
              :to="'residents/' + item.slug"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-html="item.title.rendered"
                ></v-list-item-title>
                <v-list-item-subtitle v-html="item.type" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-else-if="item.media_type === 'file'"
              :href="item.guid.rendered"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-html="item.title.rendered">
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.media_type" />
              </v-list-item-content>
            </v-list-item>

            <!-- <v-list-item-content>
                <v-list-item-title v-html="item.title.rendered">
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.acf.titlerole" />
              </v-list-item-content> -->
            <v-list-group v-else :prepend-icon="item.action" no-action>
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
                  <v-list-item-title
                    class="mb-5"
                    v-text="item.acf.phone | formatPhone"
                  ></v-list-item-title>
                  <v-list-item-title
                    class="mb-5"
                    v-if="item.acf.email"
                    :href="item.acf.email"
                    v-text="item.acf.email"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <!-- </v-list-item> -->
          </v-list-item-group>
        </v-list>
      </v-card>

      content: {{ content }}
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
    content: {},
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
          5: "goverment",
          15: "residents",
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

      // fetch($this.api.)
    },
  },
}
</script>

<style lang="scss" scoped></style>
