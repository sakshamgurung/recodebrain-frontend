import Head from "next/head";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "../components/layout/Layout";
import useGtag from "../lib/useGtag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	useGtag();

	return (
		<NotificationContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	);
}

export default MyApp;
