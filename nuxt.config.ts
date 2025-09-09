// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-swiper", "@pinia/nuxt"],
  css: ["~/css/tailwind.css", "~/css/flaticon.css"],
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
