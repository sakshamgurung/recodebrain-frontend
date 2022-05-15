import StoryCard from "./StoryCard";

function StoryFeatured({ stories }) {
	// only three featured stories
	if (stories.length > 3) {
		stories = _.slice(stories, 0, 3);
	}

	return (
		<div className="grid gap-1 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
			{stories.map((story) => {
				return <StoryCard key={story.slug} story={story} />;
			})}
		</div>
	);
}

export default StoryFeatured;
