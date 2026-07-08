// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  css: ['~/assets/css/tokens.css'],
  googleFonts: {
    families: {
      'Space Grotesk': [600, 700],
      'Inter': [400, 500],
      'JetBrains Mono': [500]
    },
    display: 'swap'
  },
  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ]
  }
})
