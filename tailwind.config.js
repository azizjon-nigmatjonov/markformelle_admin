/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        bigDesktop: "1540",
        desktop: "1400px",
        mediumScreen: "1380px",
        small_desktop: "1280px",
        ipod: "940px",
        mobile: "768px",
      },
      spacing: {
        "0px": "0px",
        px: "1px",
        "2px": "2px",
        "4px": "4px",
        "6px": "6px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "32px": "32px",
      },
    },
  },
  plugins: [],
};
