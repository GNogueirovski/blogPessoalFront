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
        mediumbrown:"#4CAF50",
        darkorange:"#FB8B24",
        verygrey:"#F5F5F5", 
        superblack:"#E63946",
        hovergreen:"#388E3C",

      }
    },
  },
  plugins: [],
}

