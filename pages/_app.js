import Head from "next/head";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
