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
          @change="changed(n, null)"
          required
        ></v-radio>
      </v-radio-group>
      name:{{ name || null }}
      <form>
        <v-text-field
          v-if="radioGroup"
          :counter="10"
          :rules="rules"
          label="Name"
          required
        ></v-text-field>
        <!-- @change="" -->

        <v-btn class="mr-4" @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
      content: {{ content }}
    </v-container>
  </div>
</template>

<script>
import officeVue from "../layouts/office.vue"
export default {
  data: () => ({
    valid: true,
    radioGroup: null,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    content: {},
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    select: null,

    checkbox: false,
    categories: {
      documents: {
        label: "Documents",
        url: "media",
      },
      office: {
        label: "Offices",
        url: "office",
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
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async changed(e, searchinput) {
      this.name = this.$config.apiUrl + e.url
      if (searchinput.length < 3) {
        this.content = await fetch(
          this.$config.apiUrl +
            e.url +
            "?per_page=100" +
            "&search" +
            searchinput
        ).then((res) => res.json())
      }

      // fetch($this.api.)
    },
  },
}
</script>

<style lang="scss" scoped></style>
