module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					0: "#dbf8ff",
					50: "#c1f0fe",
					100: "#a7e5fe",
					200: "#8fd8fd",
					300: "#76c8fc",
					400: "#4ea9f8",
					500: "#308bf2",
					600: "#1a71e6",
					700: "#0b55c7",
					800: "#02307b",
					900: "#001333",
				},
			},
			fontFamily: {
				body: ["Poppins"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
