import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "ws-claret": "#750D37",
        "ws-darkcyan": "#3E8989",
        "ws-mindaro": "#90be6d"
      }
    },
  },
  plugins: [],
} satisfies Config;