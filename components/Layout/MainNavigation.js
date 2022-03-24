import { useEffect, useState } from "react";

import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import FocusLock from "react-focus-lock";

import classes from "./MainNavigation.module.css";
import MobileMenu from "./MobileMenu";

function MainNavigation() {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [openMobileMenu, setOpenMobileMenu] = useState(false);

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

	const toggleMobileMenu = () => {
		setOpenMobileMenu(!openMobileMenu);
	};

	return (
		<header className={`${classes.header}`}>
			{/* <header className={`${classes.header} ${!show && classes.headerHidden}`}> */}
			<Link href="/">
				<a className={classes.logo}>RecodeBrain</a>
			</Link>
			<div className={classes.mobileMenu}>
				<FocusLock disabled={!openMobileMenu}>
					<FaHamburger size="1.5em" onClick={toggleMobileMenu} />
					<MobileMenu isOpen={openMobileMenu} onClose={toggleMobileMenu} />
				</FocusLock>
			</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/series">
							<a>Series</a>
						</Link>
					</li>
					<li>
						<Link href="/topics">
							<a>Topics</a>
						</Link>
					</li>
					<li>
						<Link href="/about">
							<a>About</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
