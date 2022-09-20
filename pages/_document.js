import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/icons/logo/favicon-16x16.png" sizes="16x16" type="image/png" />
				<link rel="icon" href="/icons/logo/favicon-32x32.png" sizes="32x32" type="image/png" />
				<link
					rel="apple-touch-icon"
					href="/icons/logo/apple-touch-icon.png"
					sizes="180x180"
					type="image/png"
				/>
			</Head>
			<body className="text-gray-700 bg-light dark:bg-dark dark:text-slate-100">
				{/* <!-- Google Tag Manager (noscript) --> */}
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				{/* <!-- End Google Tag Manager (noscript) --> */}
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
