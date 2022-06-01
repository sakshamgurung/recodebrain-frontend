import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

function DesktopMenu({ isClear }) {
	const menu = [
		{
			link: "/",
			title: "Home",
		},
		{
			link: "/topics",
			title: "Topics",
		},
		{
			link: "/serial",
			title: "Serial",
		},
		{
			link: "/about",
			title: "About",
		},
	];
	return (
		<nav className="flex-1 hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
			<Link href="/">
				<a className="relative h-20 w-52">
					{isClear ? (
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
			<ul className="flex items-baseline space-x-16 text-base font-medium list-none">
				{menu.map((m, index) => (
					<li key={index} className="relative">
						<Link href={`${m.link}`}>
							<a
								className={classNames(
									"after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition after:duration-200 after:ease-out",
									{ "after:bg-primary-800": isClear },
									{ "after:bg-slate-100": !isClear }
								)}
							>
								{m.title}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default DesktopMenu;
