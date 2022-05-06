import StoryContent from "./StoryContent";
import StoryHeader from "./StoryHeader";

function Story({ story }) {
	const imagePath = `/images/stories/${story.slug}/${story.image}`;

	return (
		<div className="w-[1600] flex flex-col justify-center items-center m-auto">
			<StoryHeader title={story.title} excerpt={story.excerpt} image={imagePath} />
			<StoryContent slug={story.slug} content={story.content} />
		</div>
	);
}

export default Story;
