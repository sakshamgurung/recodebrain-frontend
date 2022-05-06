import { useEffect, useState } from "react";

import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import FocusLock from "react-focus-lock";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function MainNavigation() {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > lastScrollY) {
				setShow(false);
			} else {
				setShow(true);
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

	return (
		<header className="fixed top-0 z-10 w-full h-16 bg-primary-600 text-slate-100 flex justify-between items-center px-[2%]">
			{/* <header className={`${classes.header} ${!show && -top-28}`}> */}
			<Link href="/">
				<a className="text-3xl font-medium">RecodeBrain</a>
			</Link>
			<div className="inline md:hidden">
				<FocusLock disabled={!isOpenMobileMenu}>
					<FaHamburger size="26" onClick={openMobileMenu} />
					<MobileMenu isOpen={isOpenMobileMenu} onClose={closeMobileMenu} />
				</FocusLock>
			</div>
			<div className="hidden md:inline">
				<DesktopMenu />
			</div>
		</header>
	);
}

export default MainNavigation;
