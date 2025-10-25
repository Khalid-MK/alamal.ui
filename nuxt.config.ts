// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 5174
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: true,
        global: true
      }
    ]
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
        langDir: 'locales',
        locales: [
          { code: 'en', iso: 'en', files: ['en.json', 'about/en.json'], name: 'English', dir: 'ltr' },
          { code: 'ar', iso: 'ar', files: ['ar.json', 'about/ar.json'], name: 'العربية', dir: 'rtl' },
          { code: 'ru', iso: 'ru', files: ['ru.json', 'about/ru.json'], name: 'Русский', dir: 'ltr' },
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
  css: ["~/assets/css/tailwind.scss", "~/assets/css/vendor/icomoon.css", "~/assets/css/flaticon.css"],
  app: {
    head: {
      title: 'Al-Amal Academy - Islamic Education',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Learn Quran, Arabic, and Tajweed online with certified instructors at Al-Amal Academy. Join thousands of students worldwide in our Islamic education programs.'
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Al-Amal Academy' },
        { name: 'theme-color', content: '#1ab69d' }
      ],
      link: [
        // Favicons - generate these files using instructions in /public/FAVICON-README.md
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Fonts
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
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Spartan:wght@400;500;600;700&family=Amiri:wght@300;400;700;800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        },
      ],
    },
  },
});