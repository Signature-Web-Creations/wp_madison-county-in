<template>
  <v-sheet>
    <v-row justify="end">
    <v-col cols="4">
     <v-navigation-drawer
      absolute
      permanent
      left
      width="33.66%"
      height="100vh"
      class="pt-16"

    >


      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-col>
    </v-row>
    <v-row justify="end">
    <v-col cols="8">
        <BaseSubpageheader :office="office" />
        <v-tabs
        fixed-tabs
        background-color="indigo"
        dark
      >
        <v-tab>
          Option
        </v-tab>
        <v-tab>
          Another Selection
        </v-tab>
        <v-tab>
          Items
        </v-tab>
        <v-tab>
          Another Screen
        </v-tab>
      </v-tabs>

        <section
          v-for="(row,index) in office.acf.two_column_layout" :key="row.services"
          :class="{
            'white blackish--text': index === 0,
            'redish lightgrey--text' : index % 5 === 1,
            'white blackish--text': index % 5 === 2,
          }">

          <v-container>
            <v-row
              class="d-flex flex-md-row flex-sm-column-reverse pa-10"
              :class="{
                'flex-md-row': index % 2 === 0,
                'flex-md-row-reverse ': index % 2 !== 0,
              }"
            >

              <v-col class="mt-3 col-sm-12"
                :class="{
                  'col-md-12': row.two_col_image && row.two_col_image === false,
                  'col-md-6': row.two_col_image !== false,
                  'col-md-8': row.resource_bar === true && row.two_col_image === false,
                }"
              >
                <h2 v-html="row.two_column_header"/>
                <div class="mt-7" v-html="row.services" />
              </v-col>

              <v-col class="col-md-4 col-sm-12" v-if="row.resoures">
                <v-sheet class="blueish" elevation='5'>
                  <v-card-title class="lightgrey--text text-h4">Resources</v-card-title>
                  <v-divider dark/>
                  <v-list >
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
                  <v-list-item v-for="item in row.resoures" :key="item.id" >
                    <v-list-item-content>
                      <v-list-item-title><a class=" text-decoration-none" target="_blank" v-html="item.document.title" :href="item.document.url" download></a></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  </v-list-item-group>
                  </v-list>
                </v-sheet>
              </v-col>
              <v-divider v-if="row.resoures" class="d-sm-none" vertical></v-divider>
              <v-col class="col-md-6 col-sm-12" v-else-if="row.two_col_image">
                <v-sheet elevation='5'>
                  <v-img :src="row.two_col_image" max-height="700"/>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
          <!-- <BaseSidebar/> -->

        </section>

        <v-row no-gutters v-if="profiles.length > 0">
          <v-col class="lightgrey blackish--text text-center pa-5" cols="12">
            <BaseTeam :team="profiles" />
          </v-col>
        </v-row>
     </v-col>
     </v-row>
      </v-sheet>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    collapseOnScroll: true,
    category_id: "",
    tag_id: "",
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],

  }),

  async fetch({ store }) {
    await store.dispatch("getOffices");
    await store.dispatch("getCategories");
    await store.dispatch("getTags");
    await store.dispatch("getCountyProfiles");
  },

  computed: {
    office() {
      let array = this.offices.filter(
        ({ categories, tags, slug }) =>
          categories.includes(this.category_id) &&
          tags.includes(this.tag_id) &&
          slug
      );

      return array[0];
    },

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.category_id) && tags.includes(this.tag_id)
      );
    },

    ...mapState({
      offices: state => state.offices,
      categories: state => state.categories,
      categoryMap: state => state.categoryMap,
      countyProfiles: state => state.countyProfiles,
      tags: state => state.tags
    })
  },

  async created() {
    this.category_id = this.categoryMap[this.$route.params.department];
    this.tag_id = this.tags[this.$route.params.office];
  }
};
</script>

<style lang="scss" scoped>
.intro_bar {
  padding-top: 130px;
  .section__title {
    font-size: 40px;
  }
  .section__content {
    font-size: 28px;
  }
}
.h2 {
  font-size: 30px !important;
  font-weight: 400 !important;
  &::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #ead11b;
    bottom: -10px;
    left: 0;
  }
}
.rtl{
  direction:rtl;
}
</style>
