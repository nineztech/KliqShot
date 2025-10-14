/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Gradients used dynamically in AboutPage or Services section
    'from-purple-600', 'to-pink-500',
    'from-indigo-600', 'to-purple-500',
    'from-fuchsia-500', 'to-indigo-500',
    'from-green-500', 'to-emerald-500',
    'from-blue-600', 'to-cyan-500',
    'from-orange-500', 'to-yellow-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
