import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "components/layout/Layout";
import ErrorBoundary from "components/ui/ErrorBoundary";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<ThemeProvider attribute="class">
			<NotificationContextProvider>
				<Layout>
					<Script id="google-tag-manager" strategy="afterInteractive">
						{`
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
						`}
					</Script>
					<ErrorBoundary router={router}>
						<Component {...pageProps} />
					</ErrorBoundary>
				</Layout>
			</NotificationContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
