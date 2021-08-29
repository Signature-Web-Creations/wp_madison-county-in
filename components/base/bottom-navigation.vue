<template>
  <v-bottom-navigation background-color="primary" grow absolute>
    <v-bottom-sheet v-model="contact">
      <template v-slot:activator="{ on: contact, attrs }">
        <v-btn
          class="lightgrey--text"
          value="contact"
          v-bind="attrs"
          v-on="contact"
        >
          <span class="lightgrey--text">Office Contact</span>

          <v-icon class="lightgrey--text">fa-address-book</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-card-title>Office Contact</v-card-title>
        <v-list-item class="lightgrey--text">
          <v-list-item-icon>
            <v-icon dense class="fa-fw blackish--text">
              fa-user-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="blackish--text"
              v-text="'Office Administrator'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon dense class="fa-fw blackish--text">
              fa-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="blackish--text" v-text="'1231234567'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon dense class="fa-fw blackish--text">
              fa-envelope
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="blackish--text"
              v-text="'noreply@madisoncounty.in.gov'"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-bottom-sheet v-if="docs" v-model="sheet">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="lightgrey--text" v-bind="attrs" v-on="on">
          <span class="lightgrey--text">
            Resources
          </span>
          <v-icon class="lightgrey--text">fa-file-alt </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Resources</v-card-title>
        <v-card-text style="height: 300px;">
          <v-list-item
            v-for="item in docs"
            :key="item.id"
            :href="item.document.url"
            target="_blank"
          >
            <v-list-item-icon>
              <v-icon dense class="fa-fw primary--text">
                fa-file
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="blackish--text"
              v-html="item.document.title"
            />
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    contact: false,
  }),
  props: {
    docs: [Array, Boolean],
  },
}
</script>

<style lang="scss" scoped></style>
