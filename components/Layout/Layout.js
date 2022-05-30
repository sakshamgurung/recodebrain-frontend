import { useContext } from "react";

import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
	const notificationCtx = useContext(NotificationContext);
	const activeNotification = notificationCtx.notification;

	return (
		<div className="flex flex-col justify-between min-h-screen">
			<MainNavigation />
			<main className="pt-8">{props.children}</main>
			{activeNotification ? (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			) : null}
			<Footer />
		</div>
	);
}

export default Layout;
