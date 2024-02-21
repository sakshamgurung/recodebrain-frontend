import React, { Fragment, useEffect, useState } from "react/cjs/react.development";

import Head from "next/head"; // Adjust the import path as necessary
import { useTheme } from "next-themes";
import { useLoaded } from "../../store/customHook";

function PrivacyPolicy() {
	const loaded = useLoaded();
	const { theme, systemTheme } = useTheme();
	const [privacyPolicyHtml, setPrivacyPolicyHtml] = useState("");

	useEffect(() => {
		fetch("/privacyPolicy.html")
			.then((response) => response.text())
			.then((data) => {
				setPrivacyPolicyHtml(data);
			})
			.catch((error) => {
				console.error("Error fetching privacy policy:", error);
				setPrivacyPolicyHtml("<p>Error loading the privacy policy.</p>");
			});
	}, []);

	const getTheme = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;
			return currentTheme;
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Privacy Policy | RecodeBrain</title>
				<meta name="description" content="Privacy policy of recodebrain.com" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy}`} />
			</Head>
			<div className={`max-w-[1200px] m-auto mt-8 ${getTheme()}`}>
				<div className="px-12 py-6 space-y-4 text-lg bg-white rounded-md shadow-md dark:shadow-none font-base">
					<div dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
				</div>
			</div>
		</Fragment>
	);
}

export default PrivacyPolicy;
