import { useEffect, useState } from "react";

import Link from "next/link";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

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

	return (
		<header className={`${classes.header}`}>
			{/* <header className={`${classes.header} ${!show && classes.headerHidden}`}> */}
			<Link href="/">
				<a className={classes.logo}>RecodeBrain</a>
			</Link>
			<nav className={classes.nav}>
				<ul>
					<li>
						<Link href="/about">
							<a>About</a>
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
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
