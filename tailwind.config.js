/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Make sure this is exactly 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Your file path might differ
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
