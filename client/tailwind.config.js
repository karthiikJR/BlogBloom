/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			dmsans: ["DM Sans", "sans-serif"],
		},
		extend: {
			colors: {
				ascent: "#0582CA",
				light_accent: "#00A6FB",
				dark_accent: "#003554",
				darkest_accent: "#051923",
				dark: "#040303",
				light: "#DBE9EE",
			},
		},
	},
	plugins: [],
};

