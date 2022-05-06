import StoryCard from "./StoryCard";

function StoryFeatured({ stories }) {
	return (
		<div className="grid gap-1 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
			{/* only three featured stories */}
			{stories.map((story) => {
				return <StoryCard key={story.slug} story={story} />;
			})}
		</div>
	);
}

export default StoryFeatured;
