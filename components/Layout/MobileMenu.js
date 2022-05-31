import Link from "next/link";
import Image from "next/image";

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
		<div className="absolute top-0 left-0 flex flex-col flex-1 w-full h-screen text-left bg-slate-100">
			<div className="flex items-center h-16 px-12 py-10 bg-primary-700">
				<Link href="/">
					<a className="relative h-20 w-52">
						<Image
							src="/icons/logo/logo-full-white-v2.svg"
							alt="recodebrain light logo"
							layout="fill"
							objectFit="contain"
						/>
					</a>
				</Link>
				<div className="flex justify-end flex-[50%]">
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
					<Link href="/topics">
						<a className={anchorStyle} onClick={onClose}>
							<AiFillTag className="flex-1 mr-4" size="26" color="black" />
							<span className="flex-[10]">Topics</span>
							<AiOutlineRight className="flex-1" size="26" color="black" />
						</a>
					</Link>
				</li>
				<li className={listStyle}>
					<Link href="/serial">
						<a className={anchorStyle} onClick={onClose}>
							<AiOutlineBars className="flex-1 mr-4" size="26" color="black" />
							<span className="flex-[10]">Serial</span>
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
		</div>
	);
}

export default MobileMenu;
