import _ from "lodash";

import StoryContent from "./StoryContent";
import StoryHeader from "./StoryHeader";
import SerialList from "./SerialList";
import RelatedStories from "./RelatedStories";
import Newsletter from "../../ui/NewsLetter";

function Story({ story, recommendedStories }) {
	const imagePath = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${story.coverImage.url}`;

	return (
		<div className="max-w-[1600px] flex flex-col items-center m-auto">
			<StoryHeader
				title={story.title}
				excerpt={story.excerpt}
				image={imagePath}
				author={story.author}
				meta={{
					publishedAt: story.publishedAt,
					readTime: story.readTime,
					updatedAt: story.updatedAt,
					topics: story.topics,
				}}
			/>
			{story.isSeries ? (
				<SerialList
					serialDetail={{ title: story.serial.title, slug: story.serial.slug }}
					stories={story.serial.stories}
					currentPath={`/${story.slug}`}
				/>
			) : null}
			<StoryContent content={story.content} />
			{!_.isEmpty(recommendedStories) ? <RelatedStories stories={recommendedStories} /> : null}
			<section className="relative w-full max-w-3xl p-5 bg-transparent rounded-md mt-14 text-slate-100 newsletter-bg-before-pattern newsletter-bg-after-pattern">
				<div className="absolute bg-[url('/icons/paper-plane.svg')] bg-no-repeat bg-contain w-20 h-20 right-24 -top-10"></div>
				<div className="absolute top-0 left-0 w-full h-full rounded-md bg-primary-600 -z-20"></div>
				<div className="absolute top-0 left-0 w-full h-full rounded-md opacity-80 -z-20 bg-primary-800"></div>
				<div className="flex flex-col items-center">
					<h3 className="font-mono text-2xl font-medium">Newsletter</h3>
					<p className="mb-2 text-sm italic">Get email about new stories.</p>
					<Newsletter />
				</div>
			</section>
		</div>
	);
}

export default Story;
