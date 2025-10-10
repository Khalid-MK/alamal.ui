import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'


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
  })

  nuxtApp.vueApp.use(vuetify)
})