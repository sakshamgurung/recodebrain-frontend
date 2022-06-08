import Link from "next/link";

import classNames from "classnames";

function DesktopMenu() {
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
		<nav className="flex-1 hidden md:flex md:flex-row md:items-center md:justify-end">
			<ul className="flex items-baseline space-x-16 text-base font-medium list-none">
				{menu.map((m, index) => (
					<li key={index} className="relative">
						<Link href={`${m.link}`}>
							<a
								className={classNames(
									"after:w-full after:bg-gray-700 dark:after:bg-slate-100 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition after:duration-200 after:ease-out"
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
