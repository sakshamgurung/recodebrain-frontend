import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "components/layout/Layout";
import ErrorBoundary from "components/ui/ErrorBoundary";
import useGtag from "../lib/useGtag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	useGtag();
	const router = useRouter();

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
					<ErrorBoundary router={router}>
						<Component {...pageProps} />
					</ErrorBoundary>
				</Layout>
			</NotificationContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
