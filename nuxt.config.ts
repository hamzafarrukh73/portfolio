// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-03',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@netlify/nuxt'],
  css: [
    '~/assets/css/main.css', 
  ],
  imports: {
    dirs: ['stores']
  },
  ssr: false,
  router: {
    options: {
      hashMode: false,
    },
  },
  app: {
    // baseURL: './',
  },
  nitro: {
    preset: 'netlify',
  },
})