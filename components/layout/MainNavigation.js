import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import FocusLock from "react-focus-lock";
import classNames from "classnames";
import { FaHamburger } from "react-icons/fa";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "next-themes";

import { useLoaded } from "../../store/customHook";
import DesktopMenu from "./DesktopMenu";
const MobileMenu = dynamic(() => import("./MobileMenu"));

function MainNavigation() {
	const loaded = useLoaded();
	const { theme, setTheme, systemTheme } = useTheme();
	const [clear, setClear] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > 1) {
				setClear(false);
			} else {
				setClear(true);
			}

			setLastScrollY(window.scrollY);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);

		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const openMobileMenu = () => {
		setIsOpenMobileMenu(true);
		const body = document.body;
		body.style.overflowY = "hidden";
	};

	const closeMobileMenu = () => {
		setIsOpenMobileMenu(false);
		const body = document.body;
		body.style.overflowY = "";
	};

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const toggleThemeIcon = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;

			if (currentTheme === "dark") {
				return <BsSunFill size={20} />;
			} else {
				return <BsFillMoonStarsFill size={20} />;
			}
		}
	};

	const siteLogo = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;

			if (currentTheme === "dark") {
				return (
					<Fragment>
						<div className="relative block w-16 h-12 lg:hidden">
							<Image
								src="/icons/logo/logo-white.svg"
								alt="recodebrain white logo"
								layout="fill"
								objectFit="contain"
							/>
						</div>
						<div className="relative hidden lg:h-20 lg:w-52 lg:block">
							<Image
								src="/icons/logo/logo-full-white-v2.svg"
								alt="recodebrain white logo"
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<div className="relative block w-16 h-12 lg:hidden">
							<Image
								src="/icons/logo/logo-blue.svg"
								alt="recodebrain dark logo"
								layout="fill"
								objectFit="contain"
							/>
						</div>
						<div className="relative hidden lg:h-20 lg:w-52 lg:block">
							<Image
								src="/icons/logo/logo-full-blue-v2.svg"
								alt="recodebrain dark logo"
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</Fragment>
				);
			}
		}
	};

	return (
		<header
			className={classNames(
				"sticky top-0 z-10 flex items-center justify-between w-full h-16 pr-12 pl-1 lg:pl-12 py-10 bg-light dark:bg-dark transition-color ease-linear duration-200 ",
				{ "shadow-lg dark:shadow-none": !clear }
			)}
		>
			<Link href="/">
				<a>{siteLogo()}</a>
			</Link>
			<FocusLock
				disabled={!isOpenMobileMenu}
				className="flex flex-row items-center justify-end flex-1 md:hidden"
			>
				<button aria-label="Toggle menu" aria-expanded={isOpenMobileMenu} onClick={openMobileMenu}>
					<FaHamburger size="26" />
				</button>
				<MobileMenu isOpen={isOpenMobileMenu} onClose={closeMobileMenu} />
			</FocusLock>
			<DesktopMenu />
			<button
				aria-label="Toggle light and dark theme"
				onClick={toggleTheme}
				className="border-l-[1px] border-gray-700 pl-6 ml-6 md:pl-8 md:ml-8"
			>
				{toggleThemeIcon()}
			</button>
		</header>
	);
}

export default MainNavigation;
