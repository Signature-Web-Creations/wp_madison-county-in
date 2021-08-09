<template>
  <v-bottom-navigation absolute>
    <v-btn>
      <span>Recent</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
  <!-- <div class="text-center">
    <v-bottom-navigation>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="purple" dark v-bind="attrs" v-on="on">
          Resources
        </v-btn>
      </template>
    </v-bottom-navigation>
    <v-bottom-sheet v-model="sheet">
      <v-row no-gutters>
        <v-col col="6">
          <v-list>
            <v-subheader> Office Resources</v-subheader>
            <v-virtual-scroll height="100" item-height="20">
              <v-list-item
                v-for="item in resources"
                :key="item.id"
                :href="item.document.url"
                target="_blank"
              >
                <v-list-item-icon>
                  <v-icon dense class="fa-fw blackish--text">
                    fa-file
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="blackish--text"
                    v-html="item.document.title"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-virtual-scroll>
          </v-list>
        </v-col>
        <v-col col="6">
          <v-list flat>
            <v-subheader>Office Contact</v-subheader>
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
                <v-list-item-title
                  class="blackish--text"
                  v-text="'1231234567'"
                />
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
        </v-col>
      </v-row>
    </v-bottom-sheet>
  </div> -->
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    tiles: [
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" },
    ],
  }),
  props: {
    resources: Array,
  },
}
</script>

<style lang="scss" scoped></style>
