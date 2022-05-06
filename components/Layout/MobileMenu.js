import Link from "next/link";

import {
	AiOutlineClose,
	AiOutlineRight,
	AiFillHome,
	AiOutlineBars,
	AiFillTag,
	AiFillInfoCircle,
} from "react-icons/ai";

function MobileMenu({ isOpen, onClose }) {
	if (!isOpen) {
		return <></>;
	}

	const listStyle = `border-b-[1px] border-gray-600 flex flex-1 items-center`;
	const anchorStyle = `flex items-center flex-1 outline-none`;

	return (
		<nav className="absolute top-0 left-0 flex flex-col flex-1 w-full h-screen text-left bg-slate-100">
			<div className="h-16 flex items-center bg-primary-600 px-[2%]">
				<div className="text-3xl font-medium flex-[50%]">RecodeBrain</div>
				<div className="flex justify-end flex-[50%] pr-4">
					<AiOutlineClose size="26" color="white" onClick={onClose} />
				</div>
			</div>
			<ul className="mx-4 my-4 space-y-10 text-4xl text-black uppercase">
				<li className={listStyle}>
					<Link href="/">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillHome className="flex-1 mr-4" size="26" />
							<span className="flex-[10]">Home</span>
							<AiOutlineRight className="flex-1" size="26" color="black" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/series">
						<a className={anchorStyle} onClick={onClose}>
							<AiOutlineBars className="flex-1 mr-4" size="26" color="black" />
							<span className="flex-[10]">Series</span>
							<AiOutlineRight className="flex-1" size="26" color="black" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/topics">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillTag className="flex-1 mr-4" size="26" color="black" />
							<span className="flex-[10]">Topics</span>
							<AiOutlineRight className="flex-1" size="26" color="black" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/about">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillInfoCircle className="flex-1 mr-4" size="26" color="black" />
							<span className="flex-[10]">About</span>
							<AiOutlineRight className="flex-1" size="26" color="black" />
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MobileMenu;
