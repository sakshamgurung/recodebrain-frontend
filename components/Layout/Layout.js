import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

function Layout(props) {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<MainNavigation />
			<main className="mt-16">{props.children}</main>
			<Footer />
		</div>
	);
}

export default Layout;
