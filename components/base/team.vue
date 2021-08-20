<template>
  <v-row justify="center" class="py-10">
    <!-- picture with hover affect will be -->
    <v-col
      v-for="(profile, index) in members"
      :key="profile.id"
      sm="3"
      lg="6"
      class="mb-10"
    >
      <v-dialog v-model="dialog[index]" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            class="d-flex profile_av mb-4 mx-auto"
            v-bind="attrs"
            v-on="on"
            size="150"
          >
            <v-img
              v-if="profile.media_url"
              cover
              position="top center"
              max-height="250"
              max-width="250"
              :src="profile.media_url"
            />

            <v-img
              elevation="10"
              v-else
              cover
              max-height="250"
              max-width="250"
              :src="require('~/assets/madison_silhouettes_1.png')"
            />
            <!-- <v-img :src="profile.media_url ? profile.media_url : require('~/assets/madison_silhouettes_1.jpg') "/> -->
          </v-avatar>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2 py-5">
            <v-avatar size="56">
              <v-img
                :alt="profile.title"
                :src="
                  profile.media_url != ''
                    ? profile.media_url
                    : require('~/assets/madison_silhouettes_1.png')
                "
              />
            </v-avatar>
            <div class="ml-3 mt-3">
              <span v-html="profile.title" /><br />
              <span class="v-card__subtitle" v-html="profile.titlerole" />
            </div>
          </v-card-title>
          <v-card-text class="mt-5">
            <p v-if="profile.phone != ''">
              <strong>PHONE: </strong>{{ profile.phone }}
            </p>
            <p v-if="profile.email != ''">
              <strong>EMAIL: </strong>
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </p>
            <div v-if="profile.content != ''">
              <p class="mb-0"><strong>BIOGRAPHY: </strong></p>
              <div v-if="profile.content != ''" v-html="profile.content" />
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="$set(dialog, index, false)">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="text-center">
        <h3 v-html="profile.title"></h3>
        <span v-html="profile.titlerole"></span>
      </div>
    </v-col>
    <!-- {{post}} -->
    <!-- about or mission statment department -->
  </v-row>
</template>

<script>
export default {
  props: {
    team: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  async fetch() {
    await this.setProfileImageUrl()
  },

  data() {
    return {
      dialog: [],
      logo: "https://madisoncounty.in.gov/images/recoloredlogo.png",
      members: [],
    }
  },

  methods: {
    /**
     * Used this function to get the image from the Wordpress API because
     * trying to pass the value through a function call was always returning
     * a promise and we were unable to extract the string from the promise.
     * Being pressed for time, I resorted to an old fashioned method for loop.
     */
    async setProfileImageUrl() {
      let array = []

      for (let i = 0; i < this.team.length; i++) {
        let image = await fetch(
          this.$config.apiUrl + "media/" + this.team[i].image_id
        )
          .then((response) => response.json())
          .catch((error) => error.response.status)
        if (!image.data) {
          this.team[i].media_url = image.guid.rendered
        } else {
          this.team[i].media_url = ""
        }
        array.push(this.team[i])
      }
      this.members = array
    },
  },
}
</script>

<style lang="scss" scoped>
.sectionHeader {
  &::before {
    content: "";
    width: 100%;
    height: 2px;
  }
}
.profile_av {
  box-shadow: 0 0 2px #444;
}
.v-application .headline {
  line-height: 1.2rem;
}
.v-card__subtitle {
  padding-left: 2px;
}
</style>
