/* eslint-disable @typescript-eslint/no-var-requires */
const typography = require('@tailwindcss/typography')
const bla = require('@tailwindcss/typography/src/styles')
// const forms = require('@tailwindcss/forms')
const containerQueries = require('@tailwindcss/container-queries')
const daisyui = require('daisyui')
// const plugin = require('tailwindcss/plugin')
const { fontFamily } = require('tailwindcss/defaultTheme')
/* eslint-enable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik Variable', ...fontFamily.sans],
      },
    },
  },
  plugins: [typography, containerQueries, daisyui],
  daisyui: {
    logs: false,
    themes: ['light'],
  },
}
