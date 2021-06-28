import colors from "vuetify/es5/util/colors";

export default {
  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  //   API_CLIENT: "0ecd0add360dac608301678189b3c614",
  //   API_SECRET: "3738877c2b5d766209b3a528c86af893",
  //   BASE_URL: "http://madisoncounty.signaturewebcreations.com/",
  //   WP_API_URL: "http://madisoncounty.signaturewebcreations.com/wp-json/wp/v2/",
  //   WU247_API_URL: "https://api.whatsup247.com"
  // },

  target: "static",

  router: {
    base: "/wp_madison-county-in/"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - nuxt-madison",
    title: "nuxt-madison",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/services.server.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],

  axios: {
    baseURL: process.env.BASE_URL, // Used as fallback if no runtime config is provided
    proxy: true
  },

  publicRuntimeConfig: {
    apiUrl: "http://mcapi.signaturewebcreations.com/wp-json/wp/v2/",
    wuApiUrl: "https://api.whatsup247.com"
  },

  privateRuntimeConfig: {
    apiClientId: "0ecd0add360dac608301678189b3c614",
    apiClientSecret: "3738877c2b5d766209b3a528c86af893",
    orgId: "5600aaf5d9ab987a5935c1af3ba840a2"
  },

  proxy: {
    "/api/": {
      target: "http://mcapi.signaturewebcreations.com/wp-json/wp/v2/",
      pathRewrite: { "^/api": "" },
      changeOrigin: true
    },
    "/wuapi/": {
      target: "https://api.whatsup247.com",
      pathRewrite: { "^/wuapi": "" },
      changeOrigin: true
    }
  },

  router: {
    middleware: ["bearer-token"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: "#8BC0BF",
          secondary: "#B78658",
          lightgrey: "#F5F5F5",
          black: "#413E39",
          accent: "#FFE75E",
          hyperlink: "#6A8383",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#8BC0BF",
          secondary: "#B78658",
          lightgrey: "#F5F5F5",
          black: "#413E39",
          accent: "#FFE75E",
          hyperlink: "#6A8383",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /* Color Theme Swatches in Hex */
  // .Mounds-State-park-1-hex { color: #405F73; }
  // .Mounds-State-park-2-hex { color: #C2E0F2; }
  // .Mounds-State-park-3-hex { color: #260F01; } dark brown
  // .Mounds-State-park-4-hex { color: #A64E1B; } bronze
  // .Mounds-State-park-5-hex { color: #F2F2F2; } light

  // /* Color Theme Swatches in RGBA */
  // .Mounds-State-park-1-rgba { color: rgba(64, 95, 115, 1); }
  // .Mounds-State-park-2-rgba { color: rgba(194, 224, 242, 1); }
  // .Mounds-State-park-3-rgba { color: rgba(38, 15, 1, 1); }
  // .Mounds-State-park-4-rgba { color: rgba(166, 78, 27, 1); }
  // .Mounds-State-park-5-rgba { color: rgba(242, 242, 242, 1); }

  // /* Color Theme Swatches in HSLA */
  // .Mounds-State-park-1-hsla { color: hsla(203, 28, 35, 1); }
  // .Mounds-State-park-2-hsla { color: hsla(202, 64, 85, 1); }
  // .Mounds-State-park-3-hsla { color: hsla(22, 94, 7, 1); }
  // .Mounds-State-park-4-hsla { color: hsla(22, 72, 37, 1); }
  // .Mounds-State-park-5-hsla { color: hsla(0, 0, 94, 1); }
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  devtools: true
};
