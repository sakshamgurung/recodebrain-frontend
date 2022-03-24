import Link from "next/link";

import classes from "./MobileMenu.module.css";
import { AiOutlineClose } from "react-icons/ai";

function MobileMenu({ isOpen, onClose }) {
	if (!isOpen) {
		return <></>;
	}
	return (
		<nav className={classes.nav}>
			<div className={classes.header}>
				<AiOutlineClose size="1.5em" color="white" onClick={onClose} />
			</div>
			<ul>
				<li>
					<Link href="/">
						<a onClick={onClose}>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/series">
						<a onClick={onClose}>Series</a>
					</Link>
				</li>
				<li>
					<Link href="/topics">
						<a onClick={onClose}>Topics</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a onClick={onClose}>About</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MobileMenu;
