import { useEffect, useState } from "react";

export const useLoaded = () => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), []);
	return loaded;
};

const getMobileDetect = (userAgent) => {
	const isAndroid = () => Boolean(userAgent.match(/Android/i));
	const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
	const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
	const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
	const isSSR = () => Boolean(userAgent.match(/SSR/i));
	const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
	const isDesktop = () => Boolean(!isMobile() && !isSSR());
	return {
		isMobile,
		isDesktop,
		isAndroid,
		isIos,
		isSSR,
	};
};

export const useMobileDetect = () => {
	useEffect(() => {}, []);
	const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
	return getMobileDetect(userAgent);
};
