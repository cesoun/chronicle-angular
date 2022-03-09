module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    /data-theme$/,
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: ["light", "dark", "business"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "business",
  },
}
