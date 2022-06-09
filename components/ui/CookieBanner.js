import CookieConsent from "react-cookie-consent";

function CookieBanner() {
	return (
		<CookieConsent
			class
			debug={true}
			location="bottom"
			buttonText="I got it!"
			cookieName="recodebrainCookieConsenst"
			onAccept={() => {
				alert("Acceptted");
			}}
			style={{ backgroundColor: "#374151" }}
			buttonStyle={{ backgroundColor: "#16A34A", borderRadius: "0.125rem", color: "#F1F5F9" }}
		>
			<p>
				This website uses cookies to ensure you have the best browsing experience on our website.
			</p>
		</CookieConsent>
	);
}

export default CookieBanner;
