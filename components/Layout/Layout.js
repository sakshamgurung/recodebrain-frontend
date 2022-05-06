import { Fragment } from "react/cjs/react.production.min";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

function Layout(props) {
	return (
		<Fragment>
			<MainNavigation />
			<main className="mt-16">{props.children}</main>
			<Footer />
		</Fragment>
	);
}

export default Layout;
