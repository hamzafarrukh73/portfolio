// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-03',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  css: [
    '~/assets/css/main.css', 
    '~/assets/css/buttons.css'
  ],
  imports: {
    dirs: ['stores']
  },
  ssr: true,
  router: {
    options: {
      hashMode: false,
    },
  },
  app: {
    baseURL: './',
  },
  nitro: {
    preset: 'netlify',
    baseURL: './',
  },
})