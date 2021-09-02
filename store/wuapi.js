const getAuthorization = (config, axios) => {
  return axios.post(
    "/oauth",
    {
      grant_type: "client_credentials",
      client_id: config.apiClientId,
      client_secret: config.apiClientSecret,
      scope: "",
    },
    {
      baseURL: config.wuApiUrl,
      headers: { Accept: "application/json" },
    }
  )
}

export const state = () => ({
  token: "",
  featuredEvents: [],
  latestEvents: [],
  event: {},
  directory: [],
  organization: {},
  destinations: [],
  destination: {},
  event_categories: [
    {
      key: "18",
      name: "Arts",
      image: "/img/events/categories/18-arts.png",
      color: "#8F0800",
    },
    {
      key: "15",
      name: "Auctions",
      image: "/img/events/categories/15-auctions.png",
      color: "#D1AF00",
    },
    {
      key: "8",
      name: "Business",
      image: "/img/events/categories/8-business.png",
      color: "#3F5459",
    },
    {
      key: "17",
      name: "Cars & Bikes",
      image: "/img/events/categories/17-cars-bikes.png",
      color: "#005495",
    },
    {
      key: "10",
      name: "Government",
      image: "/img/events/categories/10-civic.png",
      color: "#8B8734",
    },
    {
      key: "1",
      name: "Community/Civic Organizaitons",
      image: "/img/events/categories/3-social.png",
      color: "#403265",
    },
    {
      key: "13",
      name: "Education/School",
      image: "/img/events/categories/13-education.png",
      color: "#000000",
    },
    {
      key: "7",
      name: "Entertainment & Music",
      image: "/img/events/categories/7-entertainment.png",
      color: "#902610",
    },
    {
      key: "11",
      name: "Fairs & Festivals",
      image: "/img/events/categories/11-fairs-festivals.png",
      color: "#DE590F",
    },
    {
      key: "9",
      name: "Faith/Religious",
      image: "/img/events/categories/9-faith.png",
      color: "#446257",
    },
    {
      key: "6",
      name: "Food & Drink",
      image: "/img/events/categories/6-food-drink.png",
      color: "#9C002B",
    },
    {
      key: "12",
      name: "Health & Fitness",
      image: "/img/events/categories/12-health-fitness.png",
      color: "#485E86",
    },
    {
      key: "14",
      name: "History",
      image: "/img/events/categories/14-history.png",
      color: "#017500",
    },
    {
      key: "0",
      name: "Misc",
      image: "/img/events/categories/0-misc.png",
      color: "#fb8909",
    },
    {
      key: "5",
      name: "Shopping",
      image: "/img/events/categories/5-shopping.png",
      color: "#305300",
    },
    {
      key: "3",
      name: "Social",
      image: "/img/events/categories/3-social.png",
      color: "#403265",
    },
    {
      key: "4",
      name: "Sports & Recreation",
      image: "/img/events/categories/4-sports.png",
      color: "#2AB700",
    },
    {
      key: "16",
      name: "Veterans",
      image: "/img/events/categories/16-veterans.png",
      color: "#9D9761",
    },
    {
      key: "2",
      name: "Volunteer Opportunities",
      image: "/img/events/categories/2-volunteer.png",
      color: "#70006E",
    },
  ],
  destinations_categories: [
    {
      name: "Misc",
      image: "https://www.whatsup247.com/img/destinations/categories/misc.png",
      color: "#fb8909",
    },
    {
      name: "Architecture & Installations",
      image:
        "https://www.whatsup247.com/img/destinations/categories/architecture.png",
      color: "#000000",
    },
    {
      name: "Breweries, Distilleries & Wineries",
      image:
        "https://www.whatsup247.com/img/destinations/categories/wineries-distilleries.png",
      color: "#e18d19",
    },
    {
      name: "History: Cultural History & Markers",
      image:
        "https://www.whatsup247.com/img/destinations/categories/culture.png",
      color: "#000000",
    },
    {
      name: "Event Venues",
      image:
        "https://www.whatsup247.com/img/destinations/categories/venues.png",
      color: "#000000",
    },
    {
      name: "Fairs & Festivals",
      image:
        "https://www.whatsup247.com/img/destinations/categories/fairs-festivals.png",
      color: "#DE590F",
    },
    {
      name: "History: Faith Heritage & Cemeteries",
      image: "https://www.whatsup247.com/img/destinations/categories/faith.png",
      color: "#446257",
    },
    {
      name: "Food & Culinary",
      image: "https://www.whatsup247.com/img/destinations/categories/food.png",
      color: "#9C002B",
    },
    {
      name: "Health & Fitness",
      image:
        "https://www.whatsup247.com/img/destinations/categories/health-fitness.png",
      color: "#485E86",
    },
    {
      name: "History: Historic Cities, Towns & Districts",
      image:
        "https://www.whatsup247.com/img/destinations/categories/cities.png",
      color: "#000000",
    },
    {
      name: "Libraries",
      image:
        "https://www.whatsup247.com/img/destinations/categories/libraries.png",
      color: "#000000",
    },
    {
      name: "History: Museums & Collections",
      image:
        "https://www.whatsup247.com/img/destinations/categories/museums.png",
      color: "#b89a00",
    },
    {
      name: "Natural Spaces & Archaeology",
      image:
        "https://www.whatsup247.com/img/destinations/categories/archaeology.png",
      color: "#000000",
    },
    {
      name: "Parks & Preserves",
      image: "https://www.whatsup247.com/img/destinations/categories/parks.png",
      color: "#000000",
    },
    {
      name: "Performing Arts & Entertainment",
      image:
        "https://www.whatsup247.com/img/destinations/categories/arts-entertainment.png",
      color: "#902610",
    },
    {
      name: "Shopping & Antiques",
      image:
        "https://www.whatsup247.com/img/destinations/categories/shopping.png",
      color: "#000000",
    },
    {
      name: "History: Sports Heritage",
      image:
        "https://www.whatsup247.com/img/destinations/categories/sports-heritage.png",
      color: "#000000",
    },
    {
      name: "Sports & Recreation",
      image:
        "https://www.whatsup247.com/img/destinations/categories/sports-recreation.png",
      color: "#2ab700",
    },
    {
      name: "Arts & Artisans",
      image: "https://www.whatsup247.com/img/destinations/categories/arts.png",
      color: "#000000",
    },
    {
      name: "Trails: Heritage & Byways",
      image:
        "https://www.whatsup247.com/img/destinations/categories/trails.png",
      color: "#000000",
    },
    {
      name: "Trails: Hiking & Biking",
      image:
        "https://www.whatsup247.com/img/destinations/categories/hiking-biking.png",
      color: "#000000",
    },
    {
      name: "Travel & Lodging",
      image:
        "https://www.whatsup247.com/img/destinations/categories/travel-lodging.png",
      color: "#543800",
    },
    {
      name: "Agricultural Markets & Adventures",
      image:
        "https://www.whatsup247.com/img/destinations/categories/agriculture.png",
      color: "#000000",
    },
    {
      name: "Colleges & Universities",
      image:
        "https://www.whatsup247.com/img/destinations/categories/colleges.png",
      color: "#000000",
    },
  ],
  directory_categories: [
    {
      key: "0",
      name: "Misc",
      image: "https://www.whatsup247.com/img/directory/categories/misc.png",
      color: "#fb8909",
    },
    {
      key: "1",
      name: "Agriculture",
      image:
        "https://www.whatsup247.com/img/directory/categories/agriculture.png",
      color: "#017500",
    },
    {
      key: "2",
      name: "Antiques",
      image: "https://www.whatsup247.com/img/directory/categories/antiques.png",
      color: "#686542",
    },
    {
      key: "3",
      name: "Arts & Entertainment",
      image:
        "https://www.whatsup247.com/img/directory/categories/arts-entertainment.png",
      color: "#902610",
    },
    {
      key: "30",
      name: "Auctions",
      image: "https://www.whatsup247.com/img/directory/categories/auctions.png",
      color: "#d1af00",
    },
    {
      key: "4",
      name: "Auto & Motorcycle Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/auto-motorcycle-services.png",
      color: "#005495",
    },
    {
      key: "37",
      name: "Breweries/Wineries & Distilleries",
      image:
        "https://www.whatsup247.com/img/directory/categories/wineries-distilleries.png",
      color: "#e18d19",
    },
    {
      key: "5",
      name: "Business & Professional Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/business-professional-services.png",
      color: "#3f5459",
    },
    {
      key: "6",
      name: "Cleaning Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/cleaning-services.png",
      color: "#b6c800",
    },
    {
      key: "7",
      name: "Community & Civic Organizations",
      image:
        "https://www.whatsup247.com/img/directory/categories/community-civic-organizations.png",
      color: "#403265",
    },
    {
      key: "8",
      name: "Construction/Equipment & Contractors",
      image:
        "https://www.whatsup247.com/img/directory/categories/construction-equipment-contractors.png",
      color: "#eab039",
    },
    {
      key: "9",
      name: "Dry Cleaners/Laundry",
      image:
        "https://www.whatsup247.com/img/directory/categories/dry-cleaners-laundry.png",
      color: "#3d7dae",
    },
    {
      key: "10",
      name: "Education/School",
      image:
        "https://www.whatsup247.com/img/directory/categories/education.png",
      color: "#000000",
    },
    {
      key: "11",
      name: "Event Planning/Coordination",
      image:
        "https://www.whatsup247.com/img/directory/categories/event-planning-coordination.png",
      color: "#a900b0",
    },
    {
      key: "24",
      name: "Faith/Religious",
      image:
        "https://www.whatsup247.com/img/directory/categories/faith-religious.png",
      color: "#446257",
    },
    {
      key: "12",
      name: "Financial Products & Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/financial-services-products.png",
      color: "#009a4a",
    },
    {
      key: "13",
      name: "Fitness & Personal Care",
      image:
        "https://www.whatsup247.com/img/directory/categories/fitness-personal-care.png",
      color: "#485e86",
    },
    {
      key: "32",
      name: "Funeral Home Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/funeral-home-services.png",
      color: "#6c0077",
    },
    {
      key: "31",
      name: "Government Offices",
      image:
        "https://www.whatsup247.com/img/directory/categories/government-offices.png",
      color: "#8b8734",
    },
    {
      key: "15",
      name: "Health Care/Rehab & Therapy",
      image:
        "https://www.whatsup247.com/img/directory/categories/health-care-rehab-physical-therapy.png",
      color: "#780008",
    },
    {
      key: "16",
      name: "Home & Garden",
      image:
        "https://www.whatsup247.com/img/directory/categories/home-garden.png",
      color: "#4d8000",
    },
    {
      key: "33",
      name: "Libraries/Museums",
      image:
        "https://www.whatsup247.com/img/directory/categories/libraries-museums.png",
      color: "#b89a00",
    },
    {
      key: "18",
      name: "Manufacturing",
      image:
        "https://www.whatsup247.com/img/directory/categories/manufacturing.png",
      color: "#3f5459",
    },
    {
      key: "19",
      name: "Media & Marketing",
      image:
        "https://www.whatsup247.com/img/directory/categories/media-marketing.png",
      color: "#009d90",
    },
    {
      key: "20",
      name: "Pet Care & Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/pet-animal-service-sales.png",
      color: "#93a57a",
    },
    {
      key: "21",
      name: "Photo & Video Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/photography-videography.png",
      color: "#007f26",
    },
    {
      key: "23",
      name: "Real Estate",
      image:
        "https://www.whatsup247.com/img/directory/categories/real-estate.png",
      color: "#001c68",
    },
    {
      key: "14",
      name: "Restaurants & Food Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/restaurants-food-services.png",
      color: "#9c002b",
    },
    {
      key: "25",
      name: "Retail & Shopping",
      image:
        "https://www.whatsup247.com/img/directory/categories/retail-shopping.png",
      color: "#305300",
    },
    {
      key: "34",
      name: "Senior/Elderly Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/senior-elderly-services.png",
      color: "#1a38ff",
    },
    {
      key: "35",
      name: "Social Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/social-services.png",
      color: "#7632ff",
    },
    {
      key: "26",
      name: "Sports & Recreation",
      image:
        "https://www.whatsup247.com/img/directory/categories/sports-recreation.png",
      color: "#2ab700",
    },
    {
      key: "29",
      name: "Transportation (Logistics)",
      image:
        "https://www.whatsup247.com/img/directory/categories/transportation-logistics.png",
      color: "#796500",
    },
    {
      key: "27",
      name: "Transportation (Public)",
      image:
        "https://www.whatsup247.com/img/directory/categories/transportation-public.png",
      color: "#a98d00",
    },
    {
      key: "28",
      name: "Travel & Lodging/Camping",
      image:
        "https://www.whatsup247.com/img/directory/categories/travel-lodging-camping.png",
      color: "#543800",
    },
    {
      key: "22",
      name: "Utilities",
      image:
        "https://www.whatsup247.com/img/directory/categories/utilities.png",
      color: "#f75b00",
    },
    {
      key: "36",
      name: "Veterans",
      image: "https://www.whatsup247.com/img/directory/categories/veterans.png",
      color: "#1a3218",
    },
    {
      key: "17",
      name: "Websites & IT",
      image:
        "https://www.whatsup247.com/img/directory/categories/websites-it.png",
      color: "#0165b0",
    },
  ],
  test: "test in store wuapi",
})

export const mutations = {
  UPDATE_TOKEN: (state, string) => {
    state.token = string
  },
  UPDATE_FEATURED_EVENTS: (state, array) => {
    state.featuredEvents = array
  },
  UPDATE_LATEST_EVENTS: (state, array) => {
    state.latestEvents = array
  },
  SET_EVENT: (state, object) => {
    state.event = object
  },
  SET_ORGANIZATION: (state, object) => {
    state.organization = object
  },
  UPDATE_DIRECTORY: (state, array) => {
    state.directory = array
  },
  UPDATE_DESTINATIONS: (state, array) => {
    state.destinations = array
  },
  SET_DESTINATION: (state, object) => {
    state.destination = object
  },
}

export const actions = {
  async setApiToken({ commit }) {
    const auth = await getAuthorization(this.$config, this.$axios)
    await commit("UPDATE_TOKEN", auth.data.access_token)
    return auth.data.access_token
  },

  async getEvents({ state, dispatch, commit }, options) {
    if (!state.token) {
      await dispatch("setApiToken")
    }
    options.categories == undefined ? (options.categories = "") : null

    let organization_id = this.$config.orgId
    if (options.organization_id) {
      organization_id = options.organization_id
    }

    console.log("options --> ", options)
    let url = ""
    if (options.zip) {
      url =
        this.$config.wuApiUrl +
        "/event?zip=" +
        options.zip +
        "&distance=" +
        options.distance
    } else {
      url =
        this.$config.wuApiUrl +
        "/event?organization_id=" +
        this.$config.orgId +
        "&copromotion=1&categories=" +
        options.categories +
        "&limit=" +
        options.limit
    }
    console.log("URL --> ", url)
    const events = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        context.error(error)
      })

    if (options.type == "featured") {
      commit("UPDATE_FEATURED_EVENTS", events.slice(0, options.limit))
    } else if (options.type == "latest") {
      if (options.returnValue) {
        return events.slice(0, options.limit)
      } else {
        commit("UPDATE_LATEST_EVENTS", events.slice(0, options.limit))
      }
    }
  },

  async getEvent({ state, dispatch, commit }, id) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    const url = "/wuapi/event/" + id

    const event = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })

    commit("SET_EVENT", event)
  },

  async getOrganization({ state, dispatch }, id) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    const url = "/wuapi/directory/" + id

    const organization = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        // context.error(error)
      })
    if (id) {
      return organization
    } else {
      commit("SET_ORGANIZATION", organization)
    }
  },

  async getDirectory({ state, dispatch, commit }, options) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    const directory = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/directory?organization_id=" +
          this.$config.orgId +
          "&copromotion=1&limit=" +
          options.limit,
        {
          headers: {
            Authorization: "Bearer " + state.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        // context.error(error)
      })

    if (options.returnValue) {
      return directory
    } else {
      commit("UPDATE_DIRECTORY", directory)
    }
  },

  async getDestinations({ state, dispatch, commit }, options) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    let organization_id = this.$config.orgId
    if (options.organization_id) {
      organization_id = options.organization_id
    }

    let url =
      this.$config.wuApiUrl +
      "/destination?organization_id=" +
      organization_id +
      "&copromotion=1"
    if (options.limit) {
      url += "&limit=" + options.limit
    }

    const destinations = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        context.error(error)
      })

    if (options.returnValue) {
      return destinations
    } else {
      commit("UPDATE_DESTINATIONS", destinations)
    }
  },

  async getDestination({ state, dispatch, commit }, id) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    const url = "/wuapi/destination/" + id

    const destination = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })

    commit("SET_DESTINATION", destination)
  },
}

export const getters = {
  getDirectoryCategories: (state) => {
    return state.directory_categories
  },
}
