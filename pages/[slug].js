const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";

import Story from "../components/stories/story-detail/Story";
import { loadStoryList, loadStoryDetail, loadRecommendedStories } from "../lib/api-util";

function StoryDetailPage(props) {
	return (
		<Fragment>
			<Head>
				<meta name="description" content={props.story.excerpt} />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${props.story.slug}`} />
			</Head>
			<Story story={props.story} recommendedStories={props.recommendedStories} />
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const story = await loadStoryDetail(slug);
	const recommendedStories = await loadRecommendedStories({ slug, createdAt: story.createdAt });

	return {
		props: {
			story,
			recommendedStories,
		},
		revalidate: 600,
	};
}

export async function getStaticPaths() {
	const storyList = await loadStoryList();
	const slugs = storyList.data.map((story) => ({ params: { slug: story.slug } }));

	return {
		paths: slugs,
		fallback: false,
	};
}

export default StoryDetailPage;
