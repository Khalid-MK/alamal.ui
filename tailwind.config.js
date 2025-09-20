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
    extend: {
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
      },
    },
  },
  experimental: {
    matchVariant: true,
  },
  plugins: [],
};
