import { Fragment } from "react/cjs/react.production.min";

import StoryFeatured from "../components/stories/StoryFeatured";
import StoryGrid from "../components/stories/StoryGrid";
import Divider from "../components/ui/DividerLink";
import Newsletter from "../components/ui/NewsLetter";

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
			<section className="relative w-full max-w-3xl p-5 m-auto mt-24 bg-transparent rounded-md text-slate-100 newsletter-bg-before-pattern newsletter-bg-after-pattern">
				<div className="absolute bg-[url('/icons/paper-plane.svg')] bg-no-repeat bg-contain w-20 h-20 right-24 -top-10"></div>
				<div className="absolute top-0 left-0 w-full h-full rounded-md bg-primary-600 -z-20"></div>
				<div className="absolute top-0 left-0 w-full h-full rounded-md opacity-80 -z-20 bg-primary-800"></div>
				<div className="flex flex-col items-center">
					<h3 className="font-mono text-2xl font-medium">Newsletter</h3>
					<p className="mb-2 text-sm italic">Get email about new stories.</p>
					<Newsletter />
				</div>
			</section>
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
