import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
import { ar, en, ru } from 'vuetify/locale'
import { themeColors } from '@/constant/themeTokens'

const baseLightColors = {
  primary: themeColors.primary,
  primaryHover: themeColors.primaryHover,
  secondary: themeColors.secondary,
  'on-primary': themeColors.white,
  'on-secondary': themeColors.white,
  background: themeColors.background,
  surface: themeColors.background,
  'surface-variant': themeColors.backgroundMuted,
  success: themeColors.success,
  warning: themeColors.warning,
  error: themeColors.danger,
  info: themeColors.info,
} satisfies ThemeDefinition['colors']

const baseDarkColors = {
  primary: themeColors.primary,
  primaryHover: themeColors.primaryHover,
  secondary: themeColors.secondary,
  'on-primary': themeColors.white,
  'on-secondary': themeColors.white,
  background: themeColors.backgroundDeep,
  surface: themeColors.backgroundDark,
  'surface-variant': themeColors.extra10,
  success: themeColors.success,
  warning: themeColors.warning,
  error: themeColors.danger,
  info: themeColors.info,
} satisfies ThemeDefinition['colors']

const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...baseLightColors,
  },
}

const greenTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...baseLightColors,
    primary: themeColors.extra01,
    secondary: themeColors.primary,
  },
}

const redTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...baseLightColors,
    primary: themeColors.danger,
    secondary: themeColors.secondary,
  },
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    ...baseDarkColors,
    primary: themeColors.primary,
    secondary: themeColors.secondary,
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