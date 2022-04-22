import { Fragment } from "react/cjs/react.production.min";

import StoryFeatured from "../components/stories/StoryFeatured";
import StoryGrid from "../components/stories/StoryGrid";
import Divider from "../components/ui/DividerLink";

import { getTestStories } from "../lib/stories-util";

function HomePage(props) {
	const { stories } = props;

	return (
		<Fragment>
			<section style={{ margin: "auto", maxWidth: "1600px" }}>
				<StoryFeatured stories={stories.featuredStories} />
			</section>
			<div style={{ margin: "auto", maxWidth: "1200px" }}>
				{stories.featuredTopics.map((topic) => (
					<section key={topic.header}>
						<Divider link="#">{topic.header}</Divider>
						<StoryGrid stories={topic.stories} />
					</section>
				))}
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const stories = getTestStories();

	return {
		props: {
			stories: stories,
		},
	};
}

export default HomePage;
