import Link from "next/link";

function DesktopMenu() {
	return (
		<nav className="flex items-center">
			<ul className="flex items-baseline text-base font-semibold list-none space-x-7">
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
