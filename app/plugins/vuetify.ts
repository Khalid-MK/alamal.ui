import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { ThemeDefinition } from 'vuetify'

const greenTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#22c55e',
        secondary: '#16a34a',
    },
}

const redTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#ef4444',
        secondary: '#dc2626',
    },
}

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: '#0f172a',
        secondary: '#334155',
    },
}
const defaultTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#2563eb',
        secondary: '#ffffff',
    },
}
//
// :root {
//   --color-primary: #2563eb; /* blue-600 */
//   --color-primary-hover: #1d4ed8; /* blue-700 */
//   --color-secondary: #ffffff;
//   --color-secondary-hover: #2563eb;
// }

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'myDefault', // fallback
            themes: {
                myDefault: defaultTheme, 
                green: greenTheme,
                red: redTheme,
                dark: darkTheme,
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
