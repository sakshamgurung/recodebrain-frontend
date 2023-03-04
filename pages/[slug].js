const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";

import Story from "components/stories/story-detail/Story";
import { loadStoryList, loadStoryDetail, loadRecommendedStories } from "../lib/api-util";

function StoryDetailPage(props) {
	const metaTitle = props.story.seo.metaTitle;
	const keywords = props.story.seo.keywords;
	const metaDescription = props.story.seo.metaDescription;
	const metaImage = props.story.seo.metaImage;

	const addStoryJsonLd = () => {
		return {
			__html: `{
				"@context": "https://schema.org/",
				"@type": "NewsArticle",
				"headline":"${metaTitle}",
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
				<title>{metaTitle}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={metaDescription} />
				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" key="twcard" />
				<meta name="twitter:title" content={metaTitle} key="twtitle" />
				<meta name="twitter:description" content={metaDescription} key="twdesc" />
				<meta
					name="twitter:image"
					content={metaImage.data.attributes.formats.thumbnail.url}
					key="twimage"
				/>
				<meta
					name="twitter:image:src"
					content={metaImage.data.attributes.formats.thumbnail.url}
					key="twimagesrc"
				/>
				<meta name="twitter:image:alt" content={metaTitle} key="twimage" />
				{/* Open Graph */}
				<meta property="og:title" content={metaTitle} key="ogtitle" />
				<meta property="og:description" content={metaDescription} key="ogdesc" />
				<meta property="og:site_name" content="recodebrain.com" key="ogsitename" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_SITE_URL}/${props.story.slug}`}
					key="ogurl"
				/>
				<meta
					property="og:image"
					content={metaImage.data.attributes.formats.thumbnail.url}
					key="ogimage"
				/>
				<meta
					property="og:image:url"
					content={metaImage.data.attributes.formats.thumbnail.url}
					key="ogimageurl"
				/>
				<meta
					property="og:image:secure_url"
					content={metaImage.data.attributes.formats.thumbnail.url}
					key="ogimagesecureurl"
				/>
				<meta property="og:image:alt" content={metaTitle} key="ogimage" />

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
