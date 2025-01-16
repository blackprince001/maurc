import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maurc: {
          orange: '#F37052',
          blue: '#1A1464',
          darkblue: '#000033',
          black: '#000000',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-maurc': 'linear-gradient(to right, #000000, #1A1464)',
      },
    },
  },
  plugins: [],
} satisfies Config;