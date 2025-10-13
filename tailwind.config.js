/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      // custom max-width media query (anything below 1025px)
      "max-1025": { max: "1025px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
        heading: ["var(--font-secondary)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)", // bg-primary
          500: "var(--color-primary)", // bg-primary-500
          700: "var(--color-primary-hover)", // bg-primary-700
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // text-secondary
          700: "var(--color-secondary-hover)", // text-secondary-700
        },
        tertiary: "var(--color-tertiary)",
        heading: "var(--color-heading)",
        "heading-dark": "var(--dark-color-heading)",
        body: "var(--color-body)",
        "body-muted": "var(--color-title)",
        placeholder: "var(--color-placeholder)",
        border: "var(--color-border)",
        "border-dark": "var(--dark-color-border)",
        surface: {
          DEFAULT: "var(--color-bg-body)",
          muted: "var(--color-lighten01)",
          subtle: "var(--color-lighten02)",
          soft: "var(--color-lighten03)",
          lifted: "var(--color-lighten04)",
          dark: "var(--dark-color-bg-body)",
        },
        neutral: {
          900: "var(--color-dark)",
          800: "var(--color-extra10)",
          700: "var(--color-extra11)",
          600: "var(--color-extra09)",
        },
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        facebook: "var(--color-facebook)",
        twitter: "var(--color-twitter)",
        youtube: "var(--color-youtube)",
        linkedin: "var(--color-linkedin)",
        pinterest: "var(--color-pinterest)",
        instagram: "var(--color-instagram)",
        vimeo: "var(--color-vimeo)",
        twitch: "var(--color-twitch)",
        discord: "var(--color-discord)",
        whatsapp: "var(--color-whatsapp)",
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-small)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-big)",
        xl: "calc(var(--radius-big) + 4px)",
      },
      boxShadow: {
        darker: "var(--shadow-darker)",
        "darker-2": "var(--shadow-darker2)",
        dark: "var(--shadow-dark)",
        darkest: "var(--shadow-darkest)",
        "darker-3": "var(--shadow-darker3)",
        "darker-4": "var(--shadow-darker4)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition)",
        "smooth-2": "var(--transition-2)",
        "ease-transform": "var(--transition-transform)",
      },
    },
  },
  experimental: {
    matchVariant: true,
  },
  plugins: [],
};
