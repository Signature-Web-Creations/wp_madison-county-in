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
  priorityEvent: null,
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
    // {
    //   key: "9",
    //   name: "Faith/Religious",
    //   image: "/img/events/categories/9-faith.png",
    //   color: "#446257",
    // },
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
  organization_categories: [
    {
      key: "0",
      name: "Misc",
      image: "https://www.whatsup247.com/img/directory/categories/misc.svg",
      color: "#595959",
    },
    {
      key: "1",
      name: "Agriculture & Farm",
      image:
        "https://www.whatsup247.com/img/directory/categories/agriculture.svg",
      color: "#2E395B",
    },
    {
      key: "2",
      name: "Antiques",
      image: "https://www.whatsup247.com/img/directory/categories/antiques.svg",
      color: "#00B8C6",
    },
    {
      key: "3",
      name: "Performing Arts & Entertainment",
      image:
        "https://www.whatsup247.com/img/directory/categories/arts-entertainment.svg",
      color: "#F97A4E",
    },
    {
      key: "4",
      name: "Auto, Truck & Cycle",
      image: "https://www.whatsup247.com/img/directory/categories/auto.svg",
      color: "#823A3A",
    },
    {
      key: "5",
      name: "Business & Professional Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/business-professional-services.svg",
      color: "#315474",
    },
    {
      key: "6",
      name: "Cleaning Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/cleaning-services.svg",
      color: "#47799E",
    },
    {
      key: "7",
      name: "Community & Civic Organizations",
      image:
        "https://www.whatsup247.com/img/directory/categories/community-civic-organizations.svg",
      color: "#A04059",
    },
    {
      key: "8",
      name: "Construction/Equipment & Contractors",
      image:
        "https://www.whatsup247.com/img/directory/categories/construction-equipment-contractors.svg",
      color: "#315474",
    },
    {
      key: "9",
      name: "Dry Cleaners/Laundry",
      image:
        "https://www.whatsup247.com/img/directory/categories/dry-cleaners-laundry.svg",
      color: "#47799E",
    },
    {
      key: "10",
      name: "Education & Schools",
      image:
        "https://www.whatsup247.com/img/directory/categories/education.svg",
      color: "#29593A",
    },
    {
      key: "11",
      name: "Event Planning/Coordination",
      image:
        "https://www.whatsup247.com/img/directory/categories/event-planning.svg",
      color: "#47799E",
    },
    {
      key: "12",
      name: "Financial Products & Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/financial-services.svg",
      color: "#4AA598",
    },
    {
      key: "13",
      name: "Fitness",
      image: "https://www.whatsup247.com/img/directory/categories/fitness.svg",
      color: "#7BBA5A",
    },
    {
      key: "14",
      name: "Restaurants",
      image:
        "https://www.whatsup247.com/img/directory/categories/restaurants.svg",
      color: "#FE6625",
    },
    {
      key: "15",
      name: "Health Care",
      image:
        "https://www.whatsup247.com/img/directory/categories/health-care.svg",
      color: "#7BBA5A",
    },
    {
      key: "16",
      name: "Residential Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/residential.svg",
      color: "#47799E",
    },
    {
      key: "17",
      name: "Information Technology",
      image: "https://www.whatsup247.com/img/directory/categories/it.svg",
      color: "#315474",
    },
    {
      key: "18",
      name: "Manufacturing",
      image:
        "https://www.whatsup247.com/img/directory/categories/manufacturing.svg",
      color: "#2E395B",
    },
    {
      key: "19",
      name: "Media & Marketing",
      image:
        "https://www.whatsup247.com/img/directory/categories/media-marketing.svg",
      color: "#315474",
    },
    {
      key: "20",
      name: "Pet Care & Services",
      image: "https://www.whatsup247.com/img/directory/categories/pet-care.svg",
      color: "#47799E",
    },
    {
      key: "21",
      name: "Photo & Video Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/photo-video.svg",
      color: "#47799E",
    },
    {
      key: "22",
      name: "Utilities",
      image:
        "https://www.whatsup247.com/img/directory/categories/utilities.svg",
      color: "#AF4C35",
    },
    {
      key: "23",
      name: "Real Estate",
      image:
        "https://www.whatsup247.com/img/directory/categories/real-estate.svg",
      color: "#47799E",
    },
    {
      key: "24",
      name: "Faith & Spirituality",
      image:
        "https://www.whatsup247.com/img/directory/categories/religious.svg",
      color: "#A04059",
    },
    {
      key: "25",
      name: "Retail & Shopping",
      image:
        "https://www.whatsup247.com/img/directory/categories/retail-shopping.svg",
      color: "#00B8C6",
    },
    {
      key: "26",
      name: "Sports & Recreation",
      image:
        "https://www.whatsup247.com/img/directory/categories/sports-recreation.svg",
      color: "#4E7733",
    },
    {
      key: "27",
      name: "Public Transit",
      image:
        "https://www.whatsup247.com/img/directory/categories/public-transit.svg",
      color: "#D19D2A",
    },
    {
      key: "28",
      name: "Lodging & Camping",
      image:
        "https://www.whatsup247.com/img/directory/categories/lodging-camping.svg",
      color: "#E2C830",
    },
    {
      key: "29",
      name: "Logistics & Shipping",
      image:
        "https://www.whatsup247.com/img/directory/categories/logistics.svg",
      color: "#2E395B",
    },
    {
      key: "30",
      name: "Auctions",
      image: "https://www.whatsup247.com/img/directory/categories/auctions.svg",
      color: "#00B8C6",
    },
    {
      key: "31",
      name: "Government",
      image:
        "https://www.whatsup247.com/img/directory/categories/government.svg",
      color: "#383838",
    },
    {
      key: "32",
      name: "Funeral Home Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/funeral-home.svg",
      color: "#47799E",
    },
    {
      key: "33",
      name: "Libraries",
      image:
        "https://www.whatsup247.com/img/directory/categories/libraries.svg",
      color: "#29593A",
    },
    {
      key: "34",
      name: "Senior/Elderly Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/senior-elderly-services.svg",
      color: "#A04059",
    },
    {
      key: "35",
      name: "Social Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/social-services.svg",
      color: "#A04059",
    },
    {
      key: "36",
      name: "Veterans",
      image: "https://www.whatsup247.com/img/directory/categories/veterans.svg",
      color: "#A04059",
    },
    {
      key: "37",
      name: "Breweries/Wineries & Distilleries",
      image:
        "https://www.whatsup247.com/img/directory/categories/wineries-distilleries.svg",
      color: "#FE6625",
    },
    {
      key: "38",
      name: "Marine/Boating & Watercraft",
      image:
        "https://www.whatsup247.com/img/directory/categories/marine-boating-watercraft.svg",
      color: "#4E7733",
    },
    {
      key: "39",
      name: "Agritourism",
      image:
        "https://www.whatsup247.com/img/directory/categories/agritourism.svg",
      color: "#F97A4E",
    },
    {
      key: "40",
      name: "Arts & Artisans",
      image: "https://www.whatsup247.com/img/directory/categories/arts.svg",
      color: "#F97A4E",
    },
    {
      key: "41",
      name: "Venues",
      image: "https://www.whatsup247.com/img/directory/categories/venues.svg",
      color: "#F97A4E",
    },
    {
      key: "42",
      name: "Fairs & Festivals",
      image:
        "https://www.whatsup247.com/img/directory/categories/fairs-festivals.svg",
      color: "#F97A4E",
    },
    {
      key: "43",
      name: "Catering & Food Services",
      image: "https://www.whatsup247.com/img/directory/categories/food.svg",
      color: "#47799E",
    },
    {
      key: "44",
      name: "Museums",
      image: "https://www.whatsup247.com/img/directory/categories/museums.svg",
      color: "#F97A4E",
    },
    {
      key: "45",
      name: "Parks",
      image: "https://www.whatsup247.com/img/directory/categories/parks.svg",
      color: "#4E7733",
    },
    {
      key: "46",
      name: "Nature Preserves",
      image: "https://www.whatsup247.com/img/directory/categories/nature.svg",
      color: "#4E7733",
    },
    {
      key: "47",
      name: "Trails",
      image: "https://www.whatsup247.com/img/directory/categories/trails.svg",
      color: "#4E7733",
    },
    {
      key: "48",
      name: "Travel",
      image: "https://www.whatsup247.com/img/directory/categories/travel.svg",
      color: "#E2C830",
    },
    {
      key: "49",
      name: "History & Cultural Heritage",
      image:
        "https://www.whatsup247.com/img/directory/categories/history-culture.svg",
      color: "#F97A4E",
    },
    {
      key: "50",
      name: "Transportation Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/transportation.svg",
      color: "#D19D2A",
    },
    {
      key: "51",
      name: "Industrial Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/industrial.svg",
      color: "#315474",
    },
    {
      key: "52",
      name: "Communications",
      image:
        "https://www.whatsup247.com/img/directory/categories/communications.svg",
      color: "#AF4C35",
    },
    {
      key: "53",
      name: "Child Care Services",
      image:
        "https://www.whatsup247.com/img/directory/categories/child-care.svg",
      color: "#29593A",
    },
    {
      key: "54",
      name: "Lawn & Garden",
      image: "https://www.whatsup247.com/img/directory/categories/lawn.svg",
      color: "#00B8C6",
    },
    {
      key: "55",
      name: "Natural Spaces & Archaeology",
      image:
        "https://www.whatsup247.com/img/directory/categories/archaeology.svg",
      color: "#4E7733",
    },
    {
      key: "56",
      name: "Architecture & Installations",
      image:
        "https://www.whatsup247.com/img/directory/categories/architecture.svg",
      color: "#F97A4E",
    },
    {
      key: "57",
      name: "Bars & Lounges",
      image: "https://www.whatsup247.com/img/directory/categories/bars.svg",
      color: "#FE6625",
    },
    {
      key: "58",
      name: "Personal Care",
      image:
        "https://www.whatsup247.com/img/directory/categories/personal-care.svg",
      color: "#7BBA5A",
    },
    {
      key: "59",
      name: "Coffee Shops and Roasteries",
      image: "https://www.whatsup247.com/img/directory/categories/coffee.svg",
      color: "#FE6625",
    },
  ],
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
  SET_PRIORITY_EVENT: (state, object) => {
    state.priorityEvent = object
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

    let copromotion = 1
    if (options.copromotion) {
      copromotion = options.copromotion
    }

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
        organization_id +
        "&copromotion=" +
        copromotion
    }

    if (options.limit) {
      url += "&limit=" + options.limit
    }
    if (options.categories) {
      url += "&categories=" + options.categories
    }

    if (options.search) {
      url += "&search=" + options.search
    }

    if (options.dateFrom) {
      url += "&dateFrom=" + options.dateFrom
    }
    return this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let events = response.data.slice(0, options.limit)
        if (options.type == "featured") {
          commit("UPDATE_FEATURED_EVENTS", events)
        } else if (options.type == "latest" && !options.returnValue) {
          console.log("else case->", events)
          commit("UPDATE_LATEST_EVENTS", events)
        }
        return events
      })
      .catch((error) => {
        console.log(error)
        return []
        // context.error(error)
      })
  },

  async getPriorityEvent({ state, dispatch, commit }, id) {
    if (!state.token) {
      await dispatch("setApiToken")
    }

    const url = "/wuapi/event/" + id

    const priorityEvent = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let data = response.data
        data.priority = true
        return data
      })
      .catch((error) => {
        console.log(error)
      })

    commit("SET_PRIORITY_EVENT", priorityEvent)
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

    let url = ""
    if (options.zip) {
      url =
        this.$config.wuApiUrl +
        "/directory?zip=" +
        options.zip +
        "&distance=" +
        options.distance
    } else {
      url =
        this.$config.wuApiUrl +
        "/directory?organization_id=" +
        this.$config.orgId +
        "&copromotion=1"
    }

    if (options.limit) {
      url += "&limit=" + options.limit
    }

    const directory = await this.$axios
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

    let url = ""
    if (options.zip) {
      url =
        this.$config.wuApiUrl +
        "/destination?zip=" +
        options.zip +
        "&distance=" +
        options.distance
    } else {
      url =
        this.$config.wuApiUrl +
        "/destination?organization_id=" +
        organization_id +
        "&copromotion=1"
    }

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
    return state.organization_categories
  },
}
