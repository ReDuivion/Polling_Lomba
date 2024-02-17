/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
      theme: {
        extend: {},
      },
      plugins: [require("daisyui")],

      daisyui: {
        themes: false,
      },
    }

