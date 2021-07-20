const getAuthorization = (config, axios) => {
  return axios.post(
    "/oauth",
    {
      grant_type: "client_credentials",
      client_id: config.apiClientId,
      client_secret: config.apiClientSecret,
      scope: ""
    },
    {
      baseURL: config.wuApiUrl,
      headers: { Accept: "application/json" }
    }
  );
};

export const state = () => ({
  token: "",
  featuredEvents: [],
  latestEvents: [],
  event: {},
  directory: [],
  destinations: [],
  event_categories: [
    {
        "name":"Misc",
        "image":"https://www.whatsup247.com/img/events/categories/0-misc.png",
        "color":"#fb8909"
     },
    {
        "name":"Community/Civic Organizations",
        "image":"https://www.whatsup247.com/img/events/categories/3-social.png",
        "color":"#403265"
     },
    {
        "name":"Volunteer Opportunities",
        "image":"https://www.whatsup247.com/img/events/categories/2-volunteer.png",
        "color":"#70006E"
     },
    {
        "name":"Social",
        "image":"https://www.whatsup247.com/img/events/categories/3-social.png",
        "color":"#403265"
     },
    {
        "name":"Sports & Recreation",
        "image":"https://www.whatsup247.com/img/events/categories/4-sports.png",
        "color":"#2AB700"
     },
    {
        "name":"Shopping",
        "image":"https://www.whatsup247.com/img/events/categories/5-shopping.png",
        "color":"#305300"
     },
    {
        "name":"Food & Drink",
        "image":"https://www.whatsup247.com/img/events/categories/6-food-drink.png",
        "color":"#9C002B"
     },
    {
        "name":"Entertainment & Music",
        "image":"https://www.whatsup247.com/img/events/categories/7-entertainment.png",
        "color":"#902610"
     },
    {
        "name":"Business",
        "image":"https://www.whatsup247.com/img/events/categories/8-business.png",
        "color":"#3F5459"
     },
    {
        "name":"Faith/Religious",
        "image":"https://www.whatsup247.com/img/events/categories/9-faith.png",
        "color":"#446257"
     },
    {
        "name":"Government",
        "image":"https://www.whatsup247.com/img/events/categories/10-civic.png",
        "color":"#8B8734"
     },
    {
        "name":"Fairs & Festivals",
        "image":"https://www.whatsup247.com/img/events/categories/11-fairs-festivals.png",
        "color":"#DE590F"
     },
    {
        "name":"Health & Fitness",
        "image":"https://www.whatsup247.com/img/events/categories/12-health-fitness.png",
        "color":"#485E86"
     },
    {
        "name":"Education/School",
        "image":"https://www.whatsup247.com/img/events/categories/13-education.png",
        "color":"#000000"
     },
    {
        "name":"History",
        "image":"https://www.whatsup247.com/img/events/categories/14-history.png",
        "color":"#017500"
     },
    {
        "name":"Auctions",
        "image":"https://www.whatsup247.com/img/events/categories/15-auctions.png",
        "color":"#D1AF00"
     },
    {
        "name":"Veterans",
        "image":"https://www.whatsup247.com/img/events/categories/16-veterans.png",
        "color":"#9D9761"
     },
    {
        "name":"Cars & Bikes",
        "image":"https://www.whatsup247.com/img/events/categories/17-cars-bikes.png",
        "color":"#005495"
     },
    {
        "name":"Arts",
        "image":"https://www.whatsup247.com/img/events/categories/18-arts.png",
        "color":"#8F0800"
     }
  ],
  destinations_categories:[
    {
        "name":"Misc",
        "image":"https://www.whatsup247.com/img/destinations/categories/misc.png",
        "color":"#fb8909"

    },
    {
        "name":"Architecture & Installations",
        "image":"https://www.whatsup247.com/img/destinations/categories/architecture.png",
        "color":"#000000"

    },
    {
        "name":"Breweries, Distilleries & Wineries",
        "image":"https://www.whatsup247.com/img/destinations/categories/wineries-distilleries.png",
        "color":"#e18d19"

    },
    {
        "name":"History: Cultural History & Markers",
        "image":"https://www.whatsup247.com/img/destinations/categories/culture.png",
        "color":"#000000"

    },
    {
        "name":"Event Venues",
        "image":"https://www.whatsup247.com/img/destinations/categories/venues.png",
        "color":"#000000"

    },
    {
        "name":"Fairs & Festivals",
        "image":"https://www.whatsup247.com/img/destinations/categories/fairs-festivals.png",
        "color":"#DE590F"

    },
    {
        "name":"History: Faith Heritage & Cemeteries",
        "image":"https://www.whatsup247.com/img/destinations/categories/faith.png",
        "color":"#446257"

    },
    {
        "name":"Food & Culinary",
        "image":"https://www.whatsup247.com/img/destinations/categories/food.png",
        "color":"#9C002B"

    },
    {
        "name":"Health & Fitness",
        "image":"https://www.whatsup247.com/img/destinations/categories/health-fitness.png",
        "color":"#485E86"

    },
    {
        "name":"History: Historic Cities, Towns & Districts",
        "image":"https://www.whatsup247.com/img/destinations/categories/cities.png",
        "color":"#000000"

    },
    {
        "name":"Libraries",
        "image":"https://www.whatsup247.com/img/destinations/categories/libraries.png",
        "color":"#000000"

    },
    {
        "name":"History: Museums & Collections",
        "image":"https://www.whatsup247.com/img/destinations/categories/museums.png",
        "color":"#b89a00"

    },
    {
        "name":"Natural Spaces & Archaeology",
        "image":"https://www.whatsup247.com/img/destinations/categories/archaeology.png",
        "color":"#000000"

    },
    {
        "name":"Parks & Preserves",
        "image":"https://www.whatsup247.com/img/destinations/categories/parks.png",
        "color":"#000000"

    },
    {
        "name":"Performing Arts & Entertainment",
        "image":"https://www.whatsup247.com/img/destinations/categories/arts-entertainment.png",
        "color":"#902610"

    },
    {
        "name":"Shopping & Antiques",
        "image":"https://www.whatsup247.com/img/destinations/categories/shopping.png",
        "color":"#000000"

    },
    {
        "name":"History: Sports Heritage",
        "image":"https://www.whatsup247.com/img/destinations/categories/sports-heritage.png",
        "color":"#000000"

    },
    {
        "name":"Sports & Recreation",
        "image":"https://www.whatsup247.com/img/destinations/categories/sports-recreation.png",
        "color":"#2ab700"

    },
    {
        "name":"Arts & Artisans",
        "image":"https://www.whatsup247.com/img/destinations/categories/arts.png",
        "color":"#000000"

    },
    {
        "name":"Trails: Heritage & Byways",
        "image":"https://www.whatsup247.com/img/destinations/categories/trails.png",
        "color":"#000000"

    },
    {
        "name":"Trails: Hiking & Biking",
        "image":"https://www.whatsup247.com/img/destinations/categories/hiking-biking.png",
        "color":"#000000"

    },
    {
        "name":"Travel & Lodging",
        "image":"https://www.whatsup247.com/img/destinations/categories/travel-lodging.png",
        "color":"#543800"

    },
    {
        "name":"Agricultural Markets & Adventures",
        "image":"https://www.whatsup247.com/img/destinations/categories/agriculture.png",
        "color":"#000000"

    },
    {
        "name":"Colleges & Universities",
        "image":"https://www.whatsup247.com/img/destinations/categories/colleges.png",
        "color":"#000000"

    }
  ],
  directory_categories:[],
  test:"test in store wuapi"
});

export const mutations = {
  UPDATE_TOKEN: (state, string) => {
    state.token = string;
  },
  UPDATE_FEATURED_EVENTS: (state, array) => {
    state.featuredEvents = array;
  },
  UPDATE_LATEST_EVENTS: (state, array) => {
    state.latestEvents = array;
  },
  SET_EVENT: (state, object) => {
    state.event = object;
  },
  UPDATE_DIRECTORY: (state, array) => {
    state.directory = array;
  },
  UPDATE_DESTINATIONS: (state, array) => {
    state.destinations = array;
  }
};

export const actions = {
  async setApiToken({ commit }) {
    const auth = await getAuthorization(this.$config, this.$axios);
    await commit("UPDATE_TOKEN", auth.data.access_token);
    return auth.data.access_token;
  },

  async getEvents({ state, dispatch, commit }, options) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    let url =
      this.$config.wuApiUrl +
      "/event?organization_id=" +
      this.$config.orgId +
      "&copromotion=1";
    if (options.type == "featured") {
      url += "&categories=18,7,11,9,6,3,4,16"
    }

    const events = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        context.error(error)
      })

    if(options.type == "featured") {
      commit("UPDATE_FEATURED_EVENTS", events.slice(0, options.limit))
    } else if(options.type == "latest") {
      commit("UPDATE_LATEST_EVENTS", events.slice(0, options.limit))
    }
  },

  async getEvent({ state, dispatch, commit }, id) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const url = "/wuapi/event/" + id;

    const event = await this.$axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      });

    commit("SET_EVENT", event);
  },

  async getDirectory({ state, dispatch, commit }) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const directory = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/directory?organization_id=" +
          this.$config.orgId +
          "&copromotion=1",
        {
          headers: {
            Authorization: "Bearer " + state.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
        context.error(error);
      });
    commit("UPDATE_DIRECTORY", directory);
  },

  async getDestinations({ state, dispatch, commit }) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const destinations = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/destination?organization_id=" +
          this.$config.orgId +
          "&copromotion=1",
        {
          headers: {
            Authorization: "Bearer " + state.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
        context.error(error);
      });
    commit("UPDATE_DESTINATIONS", destinations);
  }
};
