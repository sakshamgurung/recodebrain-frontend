import StoryCard from "./StoryCard";
import classes from "./StoryFeatured.module.css";

function StoryFeatured({ stories }) {
	return (
		<div className={classes.storyFeatured}>
			{/* only three featured stories */}
			{stories.map((story) => {
				return <StoryCard story={story} />;
			})}
		</div>
	);
}

export default StoryFeatured;
