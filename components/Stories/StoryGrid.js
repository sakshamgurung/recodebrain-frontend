import StoryCard from "./StoryCard";
import classes from "./StoryGrid.module.css";

function StoryGrid() {
	return (
		<div className={classes.storyGrid}>
			<StoryCard />
			<StoryCard />
			<StoryCard />
		</div>
	);
}

export default StoryGrid;
