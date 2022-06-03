import { ThemeProvider } from "next-themes";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "../components/layout/Layout";
import useGtag from "../lib/useGtag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	useGtag();
	return (
		<ThemeProvider attribute="class">
			<NotificationContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NotificationContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
