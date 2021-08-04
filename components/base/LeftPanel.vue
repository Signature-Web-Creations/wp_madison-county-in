<template>
  <v-navigation-drawer
    fixed
    permanent
    left
    width="33.66%"
    height="100vh"
    class="px-10 pt-16 blackish"
  >
    <v-sheet class="blackish" v-if="resources">
      <v-card-title
        class="lightgrey--text font-condensed text-h4 text-uppercase"
      >
        Resources
      </v-card-title>
      <!-- {{ resoures }} -->
      <!-- <v-divider color="white" /> -->
      <v-list>
        <v-list-item-group v-model="selectedItem" class="" color="lightgrey">
          <v-list-item v-for="item in resources" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>
                <a
                  class="lightgrey--text text-decoration-none"
                  target="_blank"
                  v-html="item.document.title"
                  :href="item.document.url"
                  download
                ></a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>

    <v-sheet class="blackish">
      <v-card-title
        class="lightgrey--text font-condensed text-h4 text-uppercase"
      >
        Office Contact
      </v-card-title>
      <!-- {{ resoures }} -->
      <!-- <v-divider color="white" /> -->
      <v-list flat>
        <v-list-item class="lightgrey--text">
          <v-list-item-icon>
            <v-icon dense class="fa-fw lightgrey--text">
              fa-user-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="lightgrey--text"
              v-text="'Office Administrator'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon dense class="fa-fw lightgrey--text">
              fa-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="lightgrey--text" v-text="'1231234567'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon dense class="fa-fw lightgrey--text">
              fa-envelope
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="lightgrey--text"
              v-text="'noreply@madisoncounty.in.gov'"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    resources: Array,
  },
}
</script>

<style lang="scss" scoped></style>
