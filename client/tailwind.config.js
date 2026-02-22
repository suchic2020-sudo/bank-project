/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#ededed",
                card: "#171717",
                accent: "#3b82f6",
            }
        },
    },
    plugins: [],
    darkMode: 'class',
}
