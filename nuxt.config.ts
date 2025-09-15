// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 5174
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      '@nuxtjs/i18n',
      {
        strategy: 'prefix_except_default', // /en/home, /ar/home
        defaultLocale: 'en',
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
          { code: 'ar', iso: 'ar-EG', file: 'ar.json', name: 'العربية' }
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
  css: ["~/css/tailwind.css", "~/css/flaticon.css"],
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
  // ssr: false,
  // i18n: {
  //   /* module options */
  //   // lazy: true,
  //   langDir: "i18n",
  //   strategy: "no_prefix",
  //   locales: [
  //     {
  //       code: "ar",
  //       iso: "ar",
  //       dir: "rtl",
  //       name: "Arabic",
  //       file: "ar.json",
  //     },
  //     {
  //       code: "en",
  //       iso: "en",
  //       dir: "ltr",
  //       name: "English",
  //       file: "en.json",
  //     },
  //   ],
  //   defaultLocale: "en",
  //   defaultDirection: "ltr",
  // },


});
