import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  ssr: false,
  server: {
    host: '0.0.0.0',
    port: 3011,
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap' } // Add this line for Roboto Slab font
    ],
    script: [
      {
        src: 'https://pay.google.com/gp/p/js/pay.js',
        async: true,
        defer: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/paymentsApi',
    '~/plugins/cardsApi',
    '~/plugins/marketplaceApi',
    '~/plugins/chargebacksApi',
    '~/plugins/settlementsApi',
    '~/plugins/walletsApi',
    '~/plugins/transfersApi',
    '~/plugins/addressesApi',
    '~/plugins/paymentIntentsApi',
    '~/plugins/mocksApi',
    '~/plugins/businessAccount/addressesApi',
    '~/plugins/businessAccount/balancesApi',
    '~/plugins/businessAccount/bankAccountsApi',
    '~/plugins/businessAccount/cbitAccountsApi',
    '~/plugins/businessAccount/xpayAccountsApi',
    '~/plugins/businessAccount/rtpAccountsApi',
    '~/plugins/businessAccount/depositsApi',
    '~/plugins/businessAccount/payoutsApi',
    '~/plugins/businessAccount/transfersApi',
    '~/plugins/cryptoPaymentMetadataApi',
    '~/plugins/cryptoPaymentsApi',
    '~/plugins/beta/addressBookApi',
    '~/plugins/payoutsApi',
    '~/plugins/checkoutSessionsApi',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/dotenv'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:5001',
      pathRewrite: {'^/api/': '/api/'},
      changeOrigin: true
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
   vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,  // <-- Enables dark mode
      themes: {
        dark: {  // <-- Define color palette for dark theme
          primary: colors.blue.darken3,
          accent: colors.cyan.darken3,
          secondary: colors.teal.darken3,
          info: colors.teal.darken1,
          warning: colors.amber.darken1,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4,
        },
        light: {  // <-- You can still retain the light theme if needed
          primary: colors.indigo.lighten1,
          accent: colors.cyan.lighten1,
          secondary: colors.teal.lighten3,
          info: colors.teal.lighten3,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, { isClient, isDev }) {
      // Extend only webpack config for client-bundle
      if (isDev && isClient) {
        config.devtool = 'source-map'
      }
      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {
          vendor: {
            test: /[\\/]node_modules\/openpgp[\\/]/,
            name: 'openpgp',
            chunks: 'all',
          },
        }
      }
    },
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://api-sandbox.circle.com',
  },
  serverMiddleware: [
    {
      path: '/api/applepay',
      handler: '~/server-middleware/apiApplePay.ts',
    },
    {
      path: '/.well-known',
      handler: '~/server-middleware/domainVerification.ts',
    },
    {
      path: '/api/googlepay',
      handler: '~/server-middleware/apiGooglePay.ts',
    },
  ],
}
