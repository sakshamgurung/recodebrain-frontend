// const withPlugins = require("next-compose-plugins");
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
// 	enabled: process.env.ANALYZE === "true",
// });

// const nextConfig = {
// 	reactStrictMode: true,
// 	images: {
// 		domains: ["localhost"],
// 	},
// };

// module.exports = withPlugins([[withBundleAnalyzer]], nextConfig); 		"analyze": "cross-env ANALYZE=true next build"
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "web-projects-media.sgp1.digitaloceanspaces.com"],
	},
	// 	rewrites: async () => {
	// 		return [
	// 			{
	// 				source: "/privacy",
	// 				destination: "/privacyPolicy.html",
	// 			},
	// 		];
	// 	},
};

module.exports = nextConfig;
