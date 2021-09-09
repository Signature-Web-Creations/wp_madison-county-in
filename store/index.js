/*
this is where we will eventually hold the data
*/

export const state = () => ({
  homePage: [],
  landingPages: [],
  homeMenus: [],
  offices: [],
  communities: [],
  categories: [],
  tags: null,
  categoryMap: null,
  featuredImages: [],
  countyProfiles: [],
  countyPrimaryProfiles: [],
  categoriesWithPosts: [],
  profilePage: null,
  jobs: [],
  defaultImage: null,
})
/*
this will update the state
*/

export const mutations = {
  UPDATE_CATEGORY_MAP: (state, obj) => {
    state.categoryMap = obj
  },
  UPDATE_CATEGORIES: (state, array) => {
    state.categories = array
  },
  UPDATE_CATEGORIES_WITH_POSTS: (state, payload) => {
    state.categoriesWithPosts = payload
  },
  UPDATE_LANDING_PAGES: (state, payload) => {
    state.landingPages = payload
  },
  updateHome: (state, payload) => {
    state.homePage = payload
  },
  updatehomeMenus: (state, payload) => {
    state.homeMenus = payload
  },
  UPDATE_OFFICES: (state, payload) => {
    state.offices = payload
  },
  UPDATE_COMMUNITES: (state, payload) => {
    state.communities = payload
  },
  UPDATE_TAGS: (state, obj) => {
    state.tags = obj
  },
  UPDATE_FEATURED_IMAGES: (state, array) => {
    state.featuredImages = array
  },
  UPDATE_COUNTY_PROFILES: (state, array) => {
    state.countyPrimaryProfiles = array
  },
  UPDATE_COUNTY_PRIMARY_PROFILES: (state, array) => {
    state.countyProfiles = array
  },
  UPDATE_JOBS: (state, array) => {
    state.jobs = array
  },
  SET_DEFAULT_IMAGE: (state, object) => {
    state.defaultImage = object
  },
}

// function getFeaturedMediaURL(featuredImages, featured_media_id) {
//   if (featured_media_id === 0) {
//     return ""
//   } else {
//     for (let i = 0; i < featuredImages.length; i++) {
//       let image = featuredImages[i]
//       if (image.id === featured_media_id) {
//         return image.guid.rendered
//       }
//     }
//     return ""
//   }
// }

/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  async getLandingPages({ state, commit }) {
    if (state.landingPages.length) return
    try {
      let landingPages = await fetch(
        this.$config.apiUrl + "pages?per_page=100"
      ).then((res) => res.json())

      landingPages = landingPages.filter(
        (el) => el.status === "publish" && el.parent === 0
      )
      landingPages = landingPages.map(
        ({
          ACF,
          title,
          slug,
          yoast_head,
          content,
          categories,
          parent,
          featured_media,
        }) => ({
          ACF,
          title,
          slug,
          yoast_head,
          content,
          categories,
          parent,
          featured_media,
        })
      )
      commit("UPDATE_LANDING_PAGES", landingPages)
    } catch (err) {
      console.log(err)
    }
  },

  async getHome({ state, commit }) {
    try {
      const homePage = await fetch(
        this.$config.apiUrl + "pages/11?dbi-ajaxx"
      ).then((res) => res.json())
      commit("updateHome", homePage)
    } catch (err) {
      console.log(err)
    }
  },

  async getOffices({ state, commit }, returnValue) {
    const fields = [
      "acf",
      "slug",
      "yoast_head",
      "categories",
      "featured_media",
      "tags",
      "title",
      "content",
      "icon",
    ]
    const fieldParameter = fields.join(",")
    const url =
      this.$config.apiUrl + `office?per_page=100&_fields=${fieldParameter}`

    try {
      let offices = await fetch(url).then((res) => res.json())
      offices = offices.map(
        ({
          acf,
          slug,
          yoast_head,
          categories,
          featured_media,
          tags,
          title,
          content,
          icon,
        }) => {
          return {
            acf,
            slug,
            yoast_head,
            categories,
            media_url: featured_media,
            tags,
            name: title.rendered,
            acf_content: acf.content,
            content,
            icon: acf.icon,
            fax: acf.fax,
            organization_id: acf.organization_id,
            accordion_content: acf.additional_content_repeater,
            overview: acf.overview,
          }
        }
      )
      if (returnValue) {
        return offices
      } else {
        commit("UPDATE_OFFICES", offices)
      }
    } catch (err) {
      console.log(err)
    }
  },

  async getCommunities({ commit }, returnValue) {
    const fields = [
      "acf",
      "slug",
      "yoast_head",
      "categories",
      "featured_media",
      "tags",
      "title",
      "content",
      "icon",
    ]
    const fieldParameter = fields.join(",")
    const url =
      this.$config.apiUrl + `community?per_page=100&_fields=${fieldParameter}`

    try {
      let communities = await fetch(url).then((res) => res.json())
      communities = communities.map(
        ({
          acf,
          slug,
          yoast_head,
          categories,
          featured_media,
          tags,
          title,
        }) => {
          return {
            slug,
            yoast_head,
            categories,
            media_url: featured_media,
            tags,
            name: title.rendered,
            content: acf.services,
            url: acf.url,
            email: acf.email,
            phone: acf.phone,
            resources: acf.resources,
            zip: acf.zip_code,
          }
        }
      )
      if (returnValue) {
        return communities
      } else {
        commit("UPDATE_COMMUNITES", communities)
      }
    } catch (err) {
      console.log(err)
    }
  },

  async getCategories({ commit }, returnValue) {
    const fields = ["id", "name", "slug"]
    const parameters = fields.join(",")
    const url = this.$config.apiUrl + `categories?_fields=${parameters}`

    try {
      const categories = await fetch(url).then((res) => res.json())
      if (returnValue) {
        return categories
      }
      // categories = categories.filter(
      //   (categories) =>
      //     categories.slug === "government" || categories.slug === "residents"
      // )
      let map = {}

      categories.forEach(({ slug, id }) => {
        map[slug] = id
      })

      commit("UPDATE_CATEGORIES", categories)
      commit("UPDATE_CATEGORY_MAP", map)
    } catch (error) {
      console.log(error)
    }
  },

  async getTags({ commit }, tagsoptions) {
    const fields = ["id", "slug", "name"]
    const parameters = fields.join(",")
    const url = this.$config.apiUrl + `tags?_fields=${parameters}&per_page=100`
    if (tagsoptions.search) {
      try {
        let allsearchedtags = await fetch(
          url + "&search=" + tagsoptions.search
        ).then((res) => res.json())
        let searchtagsList = allsearchedtags.map(({ id, name, slug }) => {
          return {
            id,
            name,
            slug,
          }
        })
        return searchtagsList
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const tags = await fetch(url).then((res) => res.json())
        let tagMap = {}
        tags.forEach(({ id, slug }) => {
          tagMap[slug] = id
        })
        if (tagsoptions.getPrimary) {
          let tagsList = tags.map(({ id, name, slug }) => {
            return {
              id,
              name,
              slug,
            }
          })
          return tagsList
        } else {
          commit("UPDATE_TAGS", tagMap)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

  // async getFeaturedImages({ commit }) {
  //   const fields = ["id", "guid"]
  //   const parameters = fields.join(",")
  //   const url = this.$config.apiUrl + `media?_fields=${parameters}`
  //   try {
  //     let featuredImages = await fetch(url).then((res) => res.json())
  //     commit("UPDATE_FEATURED_IMAGES", featuredImages)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },

  async getCountyPrimaryProfiles({ commit }, options) {
    const url = this.$config.apiUrl + "profile?tags=65&per_page=100"

    try {
      let prime_profiles = await fetch(url).then((res) => res.json())
      prime_profiles = prime_profiles.map(
        ({ id, categories, content, title, acf, featured_media, tags }) => {
          return {
            id,
            categories,
            content: content.rendered,
            email: acf ? acf.email : "",
            image_id: featured_media,
            phone: acf ? acf.phone : "",
            tags,
            title: title.rendered,
            titlerole: acf ? acf.titlerole : "",
            primary: acf ? acf.office_primary : false,
          }
        }
      )
      if (options.returnValue) {
        return prime_profiles
      } else {
        commit("UPDATE_COUNTY_PRIMARY_PROFILES", prime_profiles)
      }
    } catch (err) {
      console.log(err)
    }
  },

  async getCountyProfiles({ commit }, options) {
    const fields = [
      "id",
      "title.rendered",
      "content.rendered",
      "acf.titlerole",
      "acf.email",
      "acf.phone",
      "featured_media",
      "tags",
      "categories",
      "acf.office_primary",
    ]

    const fieldParameter = fields.join(",")
    const url =
      this.$config.apiUrl +
      `profile?per_page=100&categories=` +
      options.categories +
      `&tags=` +
      options.tags +
      `&_fields=${fieldParameter}`

    try {
      let profiles = await fetch(url).then((res) => res.json())
      profiles = profiles.map(
        ({ id, categories, content, title, acf, featured_media, tags }) => {
          return {
            id,
            categories,
            content: content.rendered,
            email: acf ? acf.email : "",
            image_id: featured_media,
            phone: acf ? acf.phone : "",
            tags,
            title: title.rendered,
            titlerole: acf ? acf.titlerole : "",
            primary: acf ? acf.office_primary : false,
          }
        }
      )
      if (options.returnValue) {
        return profiles
      } else {
        commit("UPDATE_COUNTY_PROFILES", profiles)
      }
    } catch (err) {
      console.log(err)
    }
  },

  async getCategoriesWithPosts({ commit, state }, returnValue) {
    function categoryOffices(category_id) {
      let hasCategory = function (office) {
        // console.log(office.categories.includes(category_id))
        return office.categories.includes(category_id)
      }
      return state.offices
        .filter(hasCategory)
        .map(({ name, slug, content, acf_content, icon }) => {
          return { name, slug, content, acf_content, icon }
        })
    }

    function getPageWithSlug(slug) {
      /* Returns page with matching slug if found */
      for (let i = 0; i < state.landingPages.length; i++) {
        let current_page = state.landingPages[i]
        if (current_page.slug === slug) {
          return current_page
        }
      }
      throw new `Couldn't find page for slug ${slug}`()
    }

    async function setFeaturedImageUrl(config, posts) {
      let array = []
      let categories_With_Posts = posts.filter(
        (categoryobject) => categoryobject.posts.length > 0
      )

      for (let i = 0; i < categories_With_Posts.length; i++) {
        let image = await fetch(
          config.apiUrl + "media/" + categories_With_Posts[i].featured_media_id
        )
          .then((response) => response.json())
          .catch((error) => error.response.status)

        if (!image.data) {
          categories_With_Posts[i].featured_media_sizes =
            image.media_details.sizes
        } else {
          categories_With_Posts[i].featured_media_sizes = ""
        }
        array.push(categories_With_Posts[i])
      }
      return array
    }

    const result = state.categories.map((c) => {
      let category = Object.assign({}, c)
      try {
        const page = getPageWithSlug(category.slug)
        category.content = page.content.rendered
        category.featured_media_id = page.featured_media
      } catch {
        category.featured_media_url = ""
      }
      category.posts = categoryOffices(category.id)

      return category
    })

    const listOfPosts = await setFeaturedImageUrl(this.$config, result)

    if (returnValue) {
      return listOfPosts
    } else {
      commit("UPDATE_CATEGORIES_WITH_POSTS", listOfPosts)
    }
  },

  async getJobsList({ commit }) {
    const fields = [
      "id",
      "title.rendered",
      "date",
      "modified",
      "tags",
      "categories",
      "content.rendered",
      "slug",
    ]

    const fieldParameter = fields.join(",")
    const url =
      this.$config.apiUrl + `posts?per_page=100&_fields=${fieldParameter}`

    try {
      let jobs = await fetch(url).then((res) => res.json())
      jobs = jobs.map(
        ({ id, title, date, modified, tags, categories, content, slug }) => {
          return {
            id,
            title: title.rendered,
            date,
            modified,
            tags,
            categories,
            content: content.rendered,
            slug,
          }
        }
      )
      commit("UPDATE_JOBS", jobs)
    } catch (err) {
      console.log(err)
    }
  },

  getPageContent({}, slug) {
    const url = this.$config.apiUrl + `posts?slug=${slug}`

    return this.$axios.get(url).then(({ data }) => {
      return data[0]
    })
  },

  async setDefaultImage({ commit }) {
    const url = this.$config.apiUrl + "media/1589"

    const image = await this.$axios.get(url)
    commit("SET_DEFAULT_IMAGE", image.data)
  },
}
