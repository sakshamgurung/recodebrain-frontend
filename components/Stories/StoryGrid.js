import StoryCard from "./StoryCard";
import classes from "./StoryGrid.module.css";

function StoryGrid({ stories }) {
	return (
		<div className={classes.storyGrid}>
			{/* only three stories on a grid*/}
			{stories.map((story) => {
				return <StoryCard key={story.slug} story={story} />;
			})}
		</div>
	);
}

export default StoryGrid;
