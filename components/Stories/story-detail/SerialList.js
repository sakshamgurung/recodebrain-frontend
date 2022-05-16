import Link from "next/link";
import classNames from "classnames";

function SerialList({ serialDetail, stories, currentPath }) {
	return (
		<nav className="w-2/4 border-[1px] border-gray-400 shadow-md rounded-md overflow-hidden bg-zinc-100 mb-4">
			<ul>
				<li key={serialDetail.slug} className=" border-b-[1px] text-primary-600">
					<Link href={`/serial/${serialDetail.slug}`}>
						<a className="flex p-3 pl-5 text-2xl font-semibold">{serialDetail.title}</a>
					</Link>
				</li>
				{stories.map((story, index) => {
					const isActive = currentPath === `/${story.slug}`;

					return (
						<li key={story.slug} className=" border-b-[1px]">
							<Link href={`/${story.slug}`}>
								<a
									className={classNames(
										"p-3 flex flex-row items-center text-xl space-x-5 hover:bg-white",
										{
											"font-semibold": isActive,
										}
									)}
								>
									<div
										className={classNames(
											"flex font-normal items-center justify-center w-10 h-10  rounded-full ",
											{ "bg-gray-300": !isActive },
											{ "bg-primary-600 text-slate-100 ": isActive }
										)}
									>
										{index + 1}
									</div>
									<span>{story.title}</span>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default SerialList;
