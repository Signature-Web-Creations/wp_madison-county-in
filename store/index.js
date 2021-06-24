/*
this is where we will eventually hold the data
*/

var production = 'http://madisoncounty.signaturewebcreations.com/wp-json/wp/v2/'
var strpro = `http://madisoncounty.signaturewebcreations.com/wp-json/wp/v2/`
var local = "http://localhost/wp-json/wp/v2/"

export const state = () => ({
    token: null,
    homePage: [],
    landingPages: [],
    homeMenus: [],
    homeFeatures: [],
    wu247Dest: [],
    wu247Evnt: [],
    wu247Dir: [],
	  offices: [],
  	pageContent: [],
	  categories: [],
	  tags: null,
    categoryMap: null,
    featuredImages: [],
    countyProfiles: [],
    categoriesWithPosts: [],
    profilePage: null,
})
/*
this will update the state
*/

export const mutations = {
    UPDATE_TOKEN: (state, string) => {
      state.token = string;
    	// console.log(state.token + '> index.js > ' + string);
    },
    updateCategoryMap: (state, obj) => {
      state.categoryMap = obj;
    },
    updatecategoriesWithPosts: (state, payload) => {
      state.categoriesWithPosts = payload;
    },
    updatelandingPages: (state, payload) => {
      state.landingPages = payload
    },
    updateHome: (state, payload) => {
        state.homePage = payload
    },
    updatehomeMenus: (state, payload) => {
        state.homeMenus = payload
    },
    updatehomeFeatures:( state, payload) => {
      state.homeFeatures = payload
    },
    updateOffices:( state, payload) => {
      state.offices = payload
    },
    setPageContent: (state, array) => {
      state.pageContent = array;
    },
    updatecategories: (state, array) => {
      state.categories = array;
    },
    updateTags: (state, obj) => {
      state.tags = obj;
    },
    updatefeaturedImages: (state, array) => {
      state.featuredImages = array;
    },
    updatecountyProfiles: (state, array) => {
      state.countyProfiles = array;
    },
    updateCategory: (state, profileData) => {
      state.profileData = profileData;
    }
}

function getFeaturedMediaURL(featuredImages, featured_media_id) {
  if (featured_media_id === 0) {
    return '';
  } else {
    for(let i = 0; i < featuredImages.length; i++) {
      let image = featuredImages[i];
      if (image.id === featured_media_id) {
        return image.guid.rendered;
      }
    }
    return '';
  }
}

export const getters = {
  getProfiles: function (state) {
    // filter profiles that have a given category and a tag.
    return []
  },
}
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
	async fetchDepartment({ commit }, value) {
		try {
			let array = await fetch(production + 'pages').then((res) => res.json());
			commit("setPageContent", array);
	  	} catch (err) {
			console.log(err);
		}
	},

  async getlandingPages({ state, commit }) {
    if (state.landingPages.length) return
    try {
      let landingPages = await fetch(
        production + 'pages'
      ).then((res) => res.json())

      landingPages = landingPages.filter((el) => el.status === 'publish' && el.parent === 0);
      landingPages = landingPages.map(({ ACF, title, slug, yoast_head, content,categories,parent,featured_media}) => ({
        ACF,
        title,
        slug,
        yoast_head,
        content,
        categories,
        parent,
        featured_media
      }))
      commit('updatelandingPages', landingPages)
    } catch (err) {
        console.log(err);
    }
  },

  async gethomeFeatures({ state, commit }) {
    if (state.homeFeatures.length) return
    try {
      let homeFeatures = await fetch(
        production + 'home_features'
        ).then((res) => res.json())
        homeFeatures = homeFeatures.map(({ acf, title, slug, yoast_head }) => ({
          acf,
          title,
          slug,
          yoast_head,
        }))

      commit('updatehomeFeatures', homeFeatures)
    } catch (err) {
        console.log(err);
    }
  },

  async getHome({ state, commit }) {

    try {
      const homePage = await fetch(
        production + 'pages/11?dbi-ajaxx'
      ).then((res) => res.json())
      commit('updateHome', homePage)
    } catch (err) {
        console.log(err);
    }
  },

  // async gethomeMenus({ state, commit }) {
  //   try {
  //     // console.log('menu method was tried')
  //     const homeMenus = await fetch(
  //       'http://localhost/wp-json/menus/v1/menus/2'
  //       ).then((res) => res.json())
  //       // console.log(homeMenus.items)

  //     commit('updatehomeMenus', homeMenus)
  //   } catch (err) {
  //       console.log(err);
  //   }
  // },

  async wu247Dest({ state, commit}){
    try{
      const wu247Dest = await fetch(
        ''
      ).then((res) => res.json())
    } catch(err) {}

  },

  async getEvents({ state, commit }) {
    try {
      const events = await fetch(
        this.$config.wuApiUrl + "/event?organization_id=5600aaf5d9ab987a5935c1af3ba840a2"
        , {
        headers: {
          'Authorization': 'Bearer 31f6bbda2f30ab7d78019522f5a4734e269e8ea6',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        },
        method: 'GET'
        }).then(res => console.log(JSON.stringify(res)))
      console.log(events);
    } catch (err) {
      console.log(err)
    }
  },  

  async wu247Dir({ state, commit}){
    try{
      const wu247Dir = await fetch(
        ''
        ).then((res) => res.json())
       }catch(err) {}

  },

  async getOffices({commit}) {
    try {
      let offices = await fetch(
        production + 'office'
        ).then((res) => res.json())
        offices = offices.map(({ acf, slug, yoast_head, categories, tags, title , content, icon}) => ({
          acf,
          slug,
          yoast_head,
			    categories,
		      tags,
          name: title.rendered,
          content: acf.content,
          icon: acf.icon
        }))
      commit('updateOffices', offices)
    } catch (err) {
        console.log(err);
    }
  },

  async getcategories({commit}){
    const fields = [
      'id', 'name', 'slug'
    ]
    const parameters = fields.join(',')
    const url = strpro + `categories?_fields=${parameters}`
    try {
      let categories = await fetch(url).then((res) => res.json())
      let map = {}
      categories.forEach(({slug, id}) => {
        map[slug] = id
      })
      commit('updatecategories', categories)
      commit('updateCategoryMap', map)
    } catch (error) {
      console.log(error);
    }
  },

  async getTags({ state, commit}){
    const fields = [
      'id', 'slug'
    ]
    const parameters = fields.join(',')
    const url = strpro + `tags?_fields=${parameters}&per_page=100`;

    try {
      const tags = await fetch(url).then((res) => res.json())
      let tagMap = {}
      tags.forEach(({id, slug}) => {
        tagMap[slug] = id
      })
      commit('updateTags', tagMap)
    } catch (error) {
      console.log(error);
    }
  },

  async getfeaturedImages({ state, commit}){
    const fields = [
      'id', 'guid'
    ]
    const parameters = fields.join(',')
    const url = strpro + `media?_fields=${parameters}`
    try {
      let featuredImages = await fetch(url).then(res => res.json())
      commit('updatefeaturedImages', featuredImages)
      } catch (error) {
        console.log(error);
      }
    },

  async getcountyProfiles({commit}, {featuredImages}){
    const fields = [
      'id',
      'title.rendered',
      'content.rendered',
      'acf.titlerole',
      'acf.email',
      'acf.phone',
      'featured_media',
      'tags',
      'categories',
    ]

    const fieldParameter = fields.join(',')
    const url = strpro + `profile?per_page=100&_fields=${fieldParameter}`
    try {
      let profiles = await fetch(url).then((res) => res.json())
      profiles = profiles.map(({id, title, content, acf, featured_media, tags, categories}) => {
        return {
          id,
          acf,
          categories,
          content: content.rendered,
          email: acf ? acf.email : '',
          media_url: getFeaturedMediaURL(featuredImages, featured_media),
          phone: acf ? acf.phone : '',
          tags,
          title: title.rendered,
          titlerole: acf ? acf.titlerole : ''
        }
      })
      commit("updatecountyProfiles", profiles);
    } catch (err) {
      console.log(err);
		}
  },


  async getcategoriesWithPosts({commit, dispatch, state}, {categories, featuredImages, landingPages, offices}){
    const result = categories.map(c => {
      let category = Object.assign({}, c);
      try {
        const page = getPageWithSlug(category.slug);
        const id = page.featured_media;
        category.featured_media_url = getFeaturedMediaURL(featuredImages, id);
      } catch {
        category.featured_media_url = '';
      }
      category.posts = categoryOffices(category.id);
      return category;
		});

    commit('updatecategoriesWithPosts', result);

    function categoryOffices(category_id){
        let hasCategory = function (office) {
          return office.categories.includes(category_id)
        }
        return offices.filter(hasCategory).map(({name, slug, content, icon}) => {
          return {name, slug, content,icon} ;
        });
    }

    function getPageWithSlug(slug){
      /* Returns page with matching slug if found */
      for(let i = 0; i < landingPages.length; i++) {
        let current_page = landingPages[i];
        if (current_page.slug === slug) {
          return current_page;
        }
      }
      throw new `Couldn't find page for slug ${slug}`;
    }
  },
}

