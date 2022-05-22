import Head from "next/head";

import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import useGtag from "../lib/useGtag";

function MyApp({ Component, pageProps }) {
	useGtag();

	return (
		<Layout>
			<Head>
				<meta name="description" content="Blog post about web development." />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
