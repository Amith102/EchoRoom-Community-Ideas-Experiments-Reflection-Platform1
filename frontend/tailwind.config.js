module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    keyframes: {
      ripple: {
        "0%": {
          transform: "translate(-50%, -50%) scale(0.8)",
          opacity: "0.4",
        },
        "100%": {
          transform: "translate(-50%, -50%) scale(1.6)",
          opacity: "0",
        },
      },
    },
    animation: {
      ripple: "ripple 6s linear infinite",
    },
  },
},

  plugins: [],
};
