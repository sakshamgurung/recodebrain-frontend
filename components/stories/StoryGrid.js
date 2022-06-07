import StoryCard from "./StoryCard";

function StoryGrid({ stories }) {
	// only three featured stories
	if (stories.length > 3) {
		stories = _.slice(stories, 0, 3);
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 mx-4">
			{stories.map((story) => {
				return <StoryCard key={story.slug} story={story} />;
			})}
		</div>
	);
}

export default StoryGrid;
