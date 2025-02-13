/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #a10d2c 0%, #ea0c75 2%, #a0012b 4%, #b3003d 7%, #f9228a 50%, #b3003d 93%, #a0012b 96%, #ea0c75 98%, #a10d2c 100%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        playwrite: ["Playwrite NZ", "cursive"], // Add this line
        ab: ["Oswald", "sans-serif"],
        pt: ["PT Sans", "sans-serif"],
        genty: ["Genty", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
