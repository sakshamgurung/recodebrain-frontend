import _ from "lodash";

import StoryContent from "./StoryContent";
import StoryHeader from "./StoryHeader";
import SerialList from "./SerialList";
import RelatedStories from "./RelatedStories";

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
		</div>
	);
}

export default Story;