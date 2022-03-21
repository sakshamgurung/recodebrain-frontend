import StoryCard from "./StoryCard";
import classes from "./StoryFeatured.module.css";

function StoryFeatured() {
	return (
		<div className={classes.storyFeatured}>
			<StoryCard />
			<StoryCard />
			<StoryCard />
		</div>
	);
}

export default StoryFeatured;
