import withMT from "@material-tailwind/react/utils/withMT"
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [],
})