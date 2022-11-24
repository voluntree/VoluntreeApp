const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      costas: "#EFF8F4",
      ambiental: "#086841",
      cultural: "#FF6723",
      comunitario: "#FEBBBB",
      educacion: "#FFE6A4",
      deportivo: "#FFE8E8",
      bottomTabs: "#00BFA5",
      tarjetAsociacion: colors.gray[900],
      blanco: colors.white,
      rojo: colors.red,
      focusBottomTabs: "#128978",
      fondo: "#A7FFEB",
      fondoTarjeta: "#edfcf8",
    },
  },
};