import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));
import classNames from "classnames";

function SerialList({ serialDetail, stories, currentPath }) {
	return (
		<div className="max-w-3xl w-full border-[1px] border-gray-300 shadow-md rounded-md bg-slate-100 dark:bg-gray-800 mb-4">
			<ul>
				<li key={serialDetail.slug} className=" border-b-[1px]">
					<Link href={`/serial/${serialDetail.slug}`}>
						<a className="flex p-3 pl-5 text-2xl font-semibold">{serialDetail.title}</a>
					</Link>
				</li>
				{stories.map((story, index) => {
					const isActive = currentPath === `/${story.slug}`;

					return (
						<li key={story.slug} className="border-b-[1px]">
							<Link href={`/${story.slug}`}>
								<a
									className={classNames(
										"p-3 flex flex-row items-center text-xl space-x-5 hover:bg-white dark:hover:bg-gray-900",
										{
											"font-semibold": isActive,
										}
									)}
								>
									<div
										className={classNames(
											"flex font-normal items-center justify-center w-10 h-10  rounded-full ",
											{ "bg-gray-300 dark:bg-gray-700": !isActive },
											{ "bg-primary-600 text-slate-100 ": isActive }
										)}
									>
										{index + 1}
									</div>
									<span className="overflow-hidden whitespace-nowrap text-ellipsis w-[90%]">
										{story.title}
									</span>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SerialList;
