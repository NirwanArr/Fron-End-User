/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    keyframes: {
      fadeLeft: {
        "0%": {
          transform: "translate(-300px)",
        },

        "100%": { transform: "translate(0)" },
      },
      fadeIn: {
        "0%": {
          opacity: 0,
        },
        "35%": {
          opacity: 50,
        },
        "50%": {
          opacity: 100,
        },
        "85%": {
          opacity: 50,
        },
        "100%": {
          opacity: 0,
        },
      },
    },
    animation: {
      fade: "fadeLeft 0.8s ease-out",
      fadeIn: "fadeIn 2.5s ease-in infinite",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        color: {
          primary: "#050642",
          test: "#172554",
          test2: "#DBF227",
          layer: "#EBF3FC",
          layer2: "D6D58E",
        },
      },
      backgroundColor: {
        primary: "#050642",
        layer: "#EBF3FC",
        blur: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
