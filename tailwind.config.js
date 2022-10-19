const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
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