import type { Config } from "tailwindcss";
import { violetDark, crimsonDark } from "@radix-ui/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        delete50: "#e5484d",
        delete100: "#dc3e42",
        confirmDelete50: "#30a46c",
        confirmDelete100: "#2b9a66",
        primary: {
          ...violetDark,
        },
        secondary: {
          ...crimsonDark,
        },
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
