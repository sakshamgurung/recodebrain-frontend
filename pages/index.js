import { Fragment } from "react/cjs/react.production.min";

import StoryFeatured from "../components/stories/StoryFeatured";
import StoryGrid from "../components/stories/StoryGrid";
import Divider from "../components/ui/DividerLink";

function HomePage() {
	return (
		<Fragment>
			<section style={{ margin: "auto", maxWidth: "1600px" }}>
				<StoryFeatured />
			</section>
			<div style={{ margin: "auto", maxWidth: "1200px" }}>
				<section>
					<Divider link="#">Header</Divider>
					<StoryGrid />
				</section>
			</div>
		</Fragment>
	);
}

export default HomePage;
