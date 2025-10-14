// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 5174
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@nuxtjs/tailwindcss",
    [
      '@nuxtjs/i18n',
      {
        strategy: 'no_prefix', // Changed from 'prefix_except_default'
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
          { code: 'ar', iso: 'ar-EG', file: 'ar.json', name: 'العربية', dir: 'rtl' },
          { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский', dir: 'ltr' },
        ],
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_locale',
          cookieCrossOrigin: false,
          cookieSecure: false,
          alwaysRedirect: false,
          redirectOn: 'root',
          fallbackLocale: 'en'
        }
      }
    ],
    "nuxt-swiper",
    "@pinia/nuxt"
  ],
  css: ["~/assets/css/tailwind.css", "~/assets/css/flaticon.css", "~/assets/css/icomoon.css"],
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Spartan:wght@400;500;600;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        },
      ],
    },
  },
});