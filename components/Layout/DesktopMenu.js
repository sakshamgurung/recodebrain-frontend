import Link from "next/link";
import Image from "next/image";

function DesktopMenu({ isClear }) {
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
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/topics">
						<a>Topics</a>
					</Link>
				</li>
				<li>
					<Link href="/serial">
						<a>Serial</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a>About</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default DesktopMenu;
