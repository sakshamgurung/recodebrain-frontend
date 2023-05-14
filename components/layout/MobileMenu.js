import { Fragment } from "react/cjs/react.production.min";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
	AiOutlineClose,
	AiOutlineRight,
	AiFillHome,
	AiOutlineBars,
	AiFillTag,
	AiFillInfoCircle,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

import { useLoaded } from "../../store/customHook";

function MobileMenu({ isOpen, onClose, ...props }) {
	const loaded = useLoaded();
	const { theme, systemTheme } = useTheme();

	if (!isOpen) {
		return <></>;
	}

	const listStyle = `flex flex-1 items-center`;
	const anchorStyle = `flex items-center flex-1 outline-none`;

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
		<div
			aria-hidden={!isOpen}
			className="absolute top-0 bottom-0 left-0 right-0 flex flex-col flex-1 w-full h-screen text-left bg-light dark:bg-dark"
			{...props}
		>
			<div className="flex items-center h-16 py-10 pl-1 pr-12 lg:pl-12">
				<Link href="/">
					<a>{siteLogo()}</a>
				</Link>
				<div className="flex justify-end flex-[50%]">
					<AiOutlineClose size="26" onClick={onClose} className="cursor-pointer" />
				</div>
			</div>
			<ul className="mx-4 my-4 space-y-10 text-2xl uppercase">
				<li className={listStyle}>
					<Link href="/">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillHome className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">Home</span>
							<AiOutlineRight className="flex-1" size="26" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/browse">
						<a className={anchorStyle} onClick={onClose}>
							<BiSearch className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">Browse</span>
							<AiOutlineRight className="flex-1" size="26" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/topics">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillTag className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">Topics</span>
							<AiOutlineRight className="flex-1" size="26" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/serial">
						<a className={anchorStyle} onClick={onClose}>
							<AiOutlineBars className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">Serial</span>
							<AiOutlineRight className="flex-1" size="26" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/about">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillInfoCircle className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">About</span>
							<AiOutlineRight className="flex-1" size="26" />
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default MobileMenu;
