import StoryContent from "./StoryContent";
import StoryHeader from "./StoryHeader";

import classes from "./Story.module.css";

function Story({ story }) {
	const imagePath = `/images/stories/${story.slug}/${story.image}`;

	return (
		<div className={classes.story}>
			<StoryHeader title={story.title} excerpt={story.excerpt} image={imagePath} />
			<StoryContent slug={story.slug} content={story.content} />
		</div>
	);
}

export default Story;
