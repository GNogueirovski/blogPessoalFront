/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        heavyorange:"#264653",
        mediumbrown:"#A8E0FF",
        darkorange:"#FB8B24",
        verygrey:"#F5F5F5", 
        superblack:"#260F01",

      }
    },
  },
  plugins: [],
}

