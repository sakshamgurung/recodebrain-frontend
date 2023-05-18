const { Fragment } = require("react/cjs/react.production.min");
import { useState, useRef } from "react";

import Head from "next/head";
import { useTheme } from "next-themes";

import debounce from "lodash/debounce";
import filter from "lodash/filter";
import includes from "lodash/includes";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import classNames from "classnames";

import { loadStoryListV2 } from "../../lib/api-util";
import StoryCardV3 from "components/stories/StoryCardV3";
import { useLoaded } from "../../store/customHook";

function BrowsePage(props) {
	const { stories } = props;
	const loaded = useLoaded();
	const { theme, systemTheme } = useTheme();
	const [hits, setHits] = useState(stories.data);
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const searchInputRef = useRef(null);

	const searchQuery = debounce((event) => {
		const query = event.target.value;
		const formattedQuery = query.toLowerCase();
		setQuery(query);
		const results = filter(stories.data, (story) => {
			return includes(story.title.toLowerCase(), formattedQuery);
		});

		setHits(results);
	}, 1000);

	const clearQuery = () => {
		searchInputRef.current.value = "";
		setQuery("");
		setHits(stories.data);
	};

	const getTheme = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;
			return currentTheme;
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Browse the stories | RecodeBrain</title>
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/browse`} />
			</Head>

			<div className="mt-8 m-auto max-w-[1200px]">
				<h1 className="mb-8 text-4xl font-semibold text-center">Browse</h1>
				<div className="flex mx-3 mb-4">
					<div className="flex min-w-full border rounded-md dark:border-transparent">
						<input
							ref={searchInputRef}
							onChange={searchQuery}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							type="search"
							placeholder={"Search ..."}
							className="w-full bg-gray-50 dark:bg-slate-800 border-[2px] border-r-0 border-transparent rounded-md rounded-r-none text-gray-900 dark:text-slate-300 text-lg p-2.5 focus:outline-none focus:border-blue-500"
						/>
						<div
							className={classNames(
								"relative flex items-center pr-2 border-[2px] border-l-0 rounded-md rounded-l-none bg-gray-50 dark:bg-slate-800",
								{ "border-transparent": !isFocused },
								{ "border-blue-500 border-solid": isFocused }
							)}
						>
							{query === "" ? (
								getTheme() === "dark" ? (
									<IoSearchOutline size="24" color="white" />
								) : (
									<IoSearchOutline size="24" color="black" />
								)
							) : getTheme() === "dark" ? (
								<IoCloseOutline
									size="24"
									color="white"
									onClick={clearQuery}
									className="hover:cursor-pointer"
								/>
							) : (
								<IoCloseOutline
									size="24"
									color="black"
									onClick={clearQuery}
									className="hover:cursor-pointer"
								/>
							)}
						</div>
					</div>
				</div>

				<div>
					{hits.map((story) => (
						<StoryCardV3 key={story.slug} story={story} />
					))}
				</div>
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const stories = await loadStoryListV2();

	return {
		props: { stories },
		revalidate: 604800,
	};
}

export default BrowsePage;
