import { useEffect, useState } from "react";

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
// import MobileMenu from "./MobileMenu";
const MobileMenu = dynamic(() => import("./MobileMenu"));

function MainNavigation() {
	const loaded = useLoaded();
	const { theme, setTheme } = useTheme();
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
		const body = document.body;
		if (theme === "dark") {
			body.className = "text-gray-700 bg-light dark:bg-dark dark:text-slate-100";
		} else {
			body.className = "text-gray-700 bg-light dark:bg-dark dark:text-slate-100";
		}
	};

	const toggleThemeIcon = () => {
		if (loaded) {
			if (theme === "dark") {
				return <BsSunFill size={20} />;
			} else {
				return <BsFillMoonStarsFill size={20} />;
			}
		}
	};

	return (
		<header
			className={classNames(
				"sticky top-0 z-10 flex items-center justify-between w-full h-16 px-12 py-10 bg-light dark:bg-dark transition-color ease-linear duration-200 ",
				{ "shadow-lg dark:shadow-none": !clear }
			)}
		>
			<FocusLock
				disabled={!isOpenMobileMenu}
				className="flex flex-row items-center justify-between flex-1 lg:hidden"
			>
				<Link href="/">
					<a className="relative h-20 w-52">
						{theme === "dark" ? (
							<Image
								src="/icons/logo/logo-full-white-v2.svg"
								alt="recodebrain dark logo"
								layout="fill"
								objectFit="contain"
							/>
						) : (
							<Image
								src="/icons/logo/logo-full-blue-v2.svg"
								alt="recodebrain dark logo"
								layout="fill"
								objectFit="contain"
							/>
						)}
					</a>
				</Link>
				<button aria-label="Toggle menu" aria-controls="mobile-menu" onClick={openMobileMenu}>
					<FaHamburger size="26" />
				</button>
				<MobileMenu id="mobile-menu" isOpen={isOpenMobileMenu} onClose={closeMobileMenu} />
			</FocusLock>
			<DesktopMenu />
			<button onClick={toggleTheme} className="border-l-[1px] border-gray-700 pl-8 ml-12">
				{toggleThemeIcon()}
			</button>
		</header>
	);
}

export default MainNavigation;
