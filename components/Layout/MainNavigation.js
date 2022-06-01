import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import FocusLock from "react-focus-lock";
import classNames from "classnames";
import { FaHamburger } from "react-icons/fa";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function MainNavigation() {
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

	return (
		<header
			className={classNames(
				"sticky top-0 z-10 flex items-center justify-between w-full h-16 px-12 py-10 bg-primary-700 transition-color ease-linear duration-200 ",
				{ "bg-opacity-0 text-primary-800": clear },
				{ "bg-opacity-100 shadow-sm shadow-primary-700 text-slate-100": !clear }
			)}
		>
			<FocusLock
				disabled={!isOpenMobileMenu}
				className="flex flex-row items-center justify-between flex-1 lg:hidden"
			>
				<Link href="/">
					<a className="relative h-20 w-52">
						{clear ? (
							<Image
								src="/icons/logo/logo-full-blue-v2.svg"
								alt="recodebrain dark logo"
								layout="fill"
								objectFit="contain"
							/>
						) : (
							<Image
								src="/icons/logo/logo-full-white-v2.svg"
								alt="recodebrain light logo"
								layout="fill"
								objectFit="contain"
							/>
						)}
					</a>
				</Link>
				<FaHamburger size="26" onClick={openMobileMenu} />
				<MobileMenu isOpen={isOpenMobileMenu} onClose={closeMobileMenu} />
			</FocusLock>
			<DesktopMenu isClear={clear} />
		</header>
	);
}

export default MainNavigation;
