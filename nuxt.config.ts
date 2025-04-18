// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/html-validator',
    '@nuxt/scripts',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-og-image',
    'nuxt-time',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
  ],
  $production: {
    nitro: {
      preset: 'cloudflare-worker',
    },
  },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    noVueServer: true,
    typedPages: true,
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  // Ensure that any HTML validation errors are treated as build errors
  htmlValidator: {
    failOnError: true,
  },
})
