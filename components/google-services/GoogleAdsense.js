import { useEffect } from "react";

export function enableGoogleAdsense() {
	const head = document.getElementsByTagName("head")[0];
	const scriptElement = document.createElement(`script`);
	scriptElement.type = `text/javascript`;
	scriptElement.async;
	scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`;
	scriptElement.crossOrigin = "anonymous";
	head.appendChild(scriptElement);
}

export function GoogleAdsenseVertical({ client, slot }) {
	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
		<div className="w-full px-4 mt-2 overflow-hidden text-left">
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			>
				<span className="text-xs">Advertisement</span>
			</ins>
		</div>
	);
}

export function GoogleAdsenseInArticle({ client, slot }) {
	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
		<div className="w-full h-auto px-4 py-2 overflow-hidden">
			<ins
				className="adsbygoogle"
				style={{ display: "block", textAlign: "center" }}
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-layout="in-article"
				data-ad-format="fluid"
			>
				<span className="text-xs">Advertisement</span>
			</ins>
		</div>
	);
}
