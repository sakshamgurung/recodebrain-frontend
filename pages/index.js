import { Fragment } from "react/cjs/react.production.min";

import StoryFeatured from "../components/Stories/StoryFeatured";
import StoryGrid from "../components/Stories/StoryGrid";

function HomePage() {
	return (
		<Fragment>
			<section style={{ margin: "auto", maxWidth: "1600px" }}>
				<StoryFeatured />
			</section>
			<div style={{ margin: "auto", maxWidth: "1200px" }}>
				<section>
					<StoryGrid />
				</section>
			</div>
		</Fragment>
	);
}

export default HomePage;
