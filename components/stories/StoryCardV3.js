import Link from "next/link";

import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";

import RelatedTopics from "./story-detail/RelatedTopics";

function StoryCardV3({ story }) {
	const { slug, title, publishedAt, readTime, topics } = story;
	const linkPath = `/${slug}`;
	dayjs.extend(advanceFormat);
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");

	return (
		<article key={slug} className="mb-6 w-fit">
			<div className="ml-3">
				<RelatedTopics topics={topics} />
			</div>
			<Link href={linkPath}>
				<a>
					<h2 className="pl-2 text-xl font-semibold truncate border-l-4 border-transparent lg:text-2xl h-9 hover:border-primary-600">
						{title}
					</h2>
				</a>
			</Link>
			<div className="flex flex-row ml-3 font-mono text-sm gap-x-2">
				<time>{publishedDate}</time>
				<time className="px-2 border-[1px] border-gray-500 rounded-md">~ {readTime} min read</time>
			</div>
		</article>
	);
}

export default StoryCardV3;
