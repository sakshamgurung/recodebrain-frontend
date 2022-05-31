import StoryCardV2 from "../StoryCardV2";
import Divider from "../../ui/DividerLink";

function RelatedStories({ stories }) {
	return (
		<div className="flex flex-col w-full max-w-3xl">
			<Divider>Related Stories</Divider>
			<div className="flex flex-col mx-4 md:mx-0">
				{stories.map((story) => (
					<StoryCardV2 key={story.slug} story={story} className="mb-8" />
				))}
			</div>
		</div>
	);
}

export default RelatedStories;
