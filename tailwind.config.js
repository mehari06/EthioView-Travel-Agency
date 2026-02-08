/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (keeping for gradual migration)
        primary: {
          50: "#f2f7f3",
          100: "#e5ede7",
          200: "#cbdacc",
          300: "#b1c7b1",
          400: "#97b496",
          500: "#7da17b",
          600: "#648062",
          700: "#4b604a",
          800: "#324031",
          900: "#192019",
          950: "#0b0f0b",
        },
        accent: {
          50: "#fef9ec",
          100: "#fcf3d9",
          200: "#f9e7b3",
          300: "#f6db8d",
          400: "#f3cf67",
          500: "#f0c341",
          600: "#c09c34",
          700: "#907527",
          800: "#604e1a",
          900: "#30270d",
          950: "#181406",
        },
        // NEW: Udemy-inspired light theme colors
        brand: {
          // Emerald Green (Nature/Adventure - Primary action color)
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
          },
          // Blue (Trust/Sky - Secondary action)
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
          // Amber (Warmth/Sun - Highlights)
          amber: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
          },
        },
      },
      boxShadow: {
        'card': '0 8px 24px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 18px 40px rgba(15, 23, 42, 0.12)',
        'nav': '0 2px 12px rgba(15, 23, 42, 0.06)',
        'soft': '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        'card': '16px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
    },
  },
  plugins: [],
};
