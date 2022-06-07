import { useEffect } from "react";

export function GoogleAdsenseVertical({ client, slot }) {
	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
		<div className="w-full px-4 mt-2 overflow-hidden text-left">
			<span className="text-xs">Advertisment</span>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		</div>
	);
}

export function GoogleAdsenseInArticle({ client, slot }) {
	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
		<div className="w-full h-[230px] overflow-hidden px-4">
			<span className="text-xs">Advertisment</span>
			<ins
				className="adsbygoogle"
				style={{ display: "block", textAlign: "center" }}
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-layout="in-article"
				data-ad-format="fluid"
			></ins>
		</div>
	);
}
