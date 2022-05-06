import StoryCard from "./StoryCard";

function StoryGrid({ stories }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
			{/* only three stories on a grid*/}
			{stories.map((story) => {
				return <StoryCard key={story.slug} story={story} />;
			})}
		</div>
	);
}

export default StoryGrid;
