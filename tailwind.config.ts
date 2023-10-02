import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink50: "#59323F",
        pink100: "#FF577F",
        pink200: "#FF427F",
        grey100: "#F8F9FA",
        grey200: "#868E96",
        grey300: "#343B41",
        grey400: "#212529",
        grey500: "#121214",
        toastify: "#343B41",
        sucess100: "#3FE864",
        error100: "#E83F5B",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
