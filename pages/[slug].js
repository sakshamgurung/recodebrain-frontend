import { Fragment } from "react";

import Story from "../components/stories/story-detail/Story";
import { getStoryData, getStoriesFiles } from "../lib/stories-util";

function StoryDetailPage(props) {
	return (
		<Fragment>
			<Story story={props.story} />
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const storyData = getStoryData(slug);

	return {
		props: {
			story: storyData,
		},
		revalidate: 600,
	};
}

export async function getStaticPaths() {
	const storiesFilenames = getStoriesFiles();
	const slugs = storiesFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

	return {
		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false,
	};
}

export default StoryDetailPage;
