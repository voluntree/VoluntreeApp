const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      costas: "#dcf7eb",
      ambiental: "#086841",
      cultural: "#FF6723",
      comunitario: "#FEBBBB",
      educacion: "#FFE6A4",
      deportivo: "#FFE8E8",
      bottomTabs: "#086841",
      tarjetAsociacion: colors.gray[900],
      blanco: colors.white,
      rojo: colors.red[600],
      focusBottomTabs: "#128978",
      fondo: "#A7FFEB",
      fondoTarjeta: "#edfcf8",
    },
  },
};