import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
import { ar, en, ru } from 'vuetify/locale'

const greenTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#22c55e',
    secondary: '#16a34a',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
  },
}

const redTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#ef4444',
    secondary: '#dc2626',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
  },
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#0f172a',
    secondary: '#334155',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
  },
}
//default
const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#2563eb',
    secondary: '#000000',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    components,
    directives,
    theme: {
      defaultTheme: 'myDefault',
      themes: {
        myDefault: defaultTheme,
        green: greenTheme,
        red: redTheme,
        dark: darkTheme,
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 5,
        darken: 5,
      },
    },
    locale: {
      locale: 'en',
      messages: { en, ar, ru },
      rtl: { ar: true },
    },
    defaults: {
      global: {
        ripple: false,
      },
      VBtn: {
        ripple: false,
        elevation: 0,
        variant: 'flat',
        rounded: 0,
        class: 'no-vuetify-style',
      },
      VCard: {
        elevation: 0,
        rounded: 0,
        class: 'no-vuetify-style',
      },
      VTextField: {
        variant: 'outlined',
        color: undefined,
        class: 'no-vuetify-style',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})