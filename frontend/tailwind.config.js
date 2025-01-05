// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('@tailwindcss/forms')],
// }

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // pastikan path sesuai dengan struktur proyek Anda
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),  // tambahkan DaisyUI di sini
  ],
}
