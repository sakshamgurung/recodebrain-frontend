import { Fragment } from "react/cjs/react.production.min";

import StoryFeatured from "../components/stories/StoryFeatured";
import StoryGrid from "../components/stories/StoryGrid";
import Divider from "../components/ui/DividerLink";

import { loadHomePage } from "../lib/api-util";

function HomePage(props) {
	const { homePageData } = props;

	return (
		<Fragment>
			<section className="m-auto max-w-[1600px]">
				<StoryFeatured stories={homePageData.featuredStories} />
			</section>
			<div className="m-auto max-w-[1200px]">
				{homePageData.storyGrids.map((storyGrid) => (
					<section key={storyGrid.topic.slug}>
						<Divider link={`/topics/${storyGrid.topic.slug}`}>{storyGrid.topic.name}</Divider>
						<StoryGrid stories={storyGrid.stories} />
					</section>
				))}
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const homePageData = await loadHomePage();

	return {
		props: {
			homePageData,
		},
	};
}

export default HomePage;
