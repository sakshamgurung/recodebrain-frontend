import Script from "next/script";
import { ThemeProvider } from "next-themes";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "components/layout/Layout";
import useGtag from "../lib/useGtag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	useGtag();
	return (
		<ThemeProvider attribute="class">
			<NotificationContextProvider>
				<Layout>
					<Script
						id="Adsense-id"
						async
						strategy="afterInteractive"
						src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
						crossorigin="anonymous"
						onError={(e) => {
							console.error("Script failed to load", e);
						}}
					/>
					<Component {...pageProps} />
				</Layout>
			</NotificationContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
