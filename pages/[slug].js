const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";

import Story from "components/stories/story-detail/Story";
import { loadStoryList, loadStoryDetail, loadRecommendedStories } from "../lib/api-util";

function StoryDetailPage(props) {
	const [title, keywords, description] = props.story.storySEO;

	const addStoryJsonLd = () => {
		return {
			__html: `{
				"@context": "https://schema.org/",
				"@type": "NewsArticle",
				"headline":"${title.seoDescription}",
				"image":["${props.story.thumbnail}"],
				"datePublished":"${props.story.publishedAt}",
				"dateModified":"${props.story.updatedAt}",
				"author":[{
					"@type":"Person",
					"name":"Sakchhyam G",
					"url":"https://www.linkedin.com/in/sakchhyam-gurung/"
				}],
				"publisher":{
					"name":"RecodeBrain",
					"url":"https://recodebrain.com"
				}
			}
			`,
		};
	};

	return (
		<Fragment>
			<Head>
				<title>{title.seoDescription}</title>
				<meta name="keywords" content={keywords.seoDescription} />
				<meta name="description" content={description.seoDescription} />

				{/* Twitter */}
				<meta name="twitter:card" content="summary" key="twcard" />

				{/* Open Graph */}
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_SITE_URL}/${props.story.slug}`}
					key="ogurl"
				/>
				<meta property="og:image" content={props.story.thumbnail} key="ogimage" />
				<meta property="og:image:alt" content={title.seoDescription} key="ogimage" />
				<meta property="og:site_name" content="recodebrain.com" key="ogsitename" />
				<meta property="og:title" content={title.seoDescription} key="ogtitle" />
				<meta property="og:description" content={description.seoDescription} key="ogdesc" />

				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${props.story.slug}`} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={addStoryJsonLd()}
					key="story-jsonld"
				/>
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
		revalidate: 604800,
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
