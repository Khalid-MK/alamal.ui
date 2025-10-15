// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";
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
  modules: [(_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  },
    "@nuxtjs/tailwindcss",
  // '@nuxt/ui',
  [
    '@nuxtjs/i18n',
    {
      strategy: 'prefix_except_default', // /en/home, /ar/home
      defaultLocale: 'en',
      locales: [
        { code: 'en', iso: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
        { code: 'ar', iso: 'ar-EG', file: 'ar.json', name: 'العربية', dir: 'rtl' },
        { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский', dir: 'ltr' },
      ],
      lazy: true, // load translations only when needed
      langDir: 'locales/', // store files in /locales
      detectBrowserLanguage: {
        useCookie: true,
        fallbackLocale: 'en'
      }
    }
  ],
    "nuxt-swiper",
    "@pinia/nuxt"
  ],
  css: ["~/assets/css/tailwind.css", "~/assets/css/flaticon.css", "~/assets/css/vendor/icomoon.css"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        },
      ],
    },
  },
});
