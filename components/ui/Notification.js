import { useContext } from "react";

import dynamic from "next/dynamic";
import classNames from "classnames";
import { AiFillCloseCircle } from "react-icons/ai";
const NotificationContext = dynamic(() => import("../../store/notification-context"));

function Notification(props) {
	const notificationCtx = useContext(NotificationContext);

	const { title, message, status } = props;

	return (
		<div
			className={classNames(
				"fixed w-2/4 left-2/4 -translate-x-2/4 top-0 mt-20 py-2 px-4 shadow-md rounded-md bg-gray-700 text-slate-100 flex flex-row justify-between items-center",
				{ "bg-blue-500 shadow-blue-500": status === "pending" },
				{ "bg-green-500 shadow-green-500": status === "success" },
				{ "bg-red-500 shadow-red-500": status === "error" }
			)}
			onClick={notificationCtx.hideNotification}
		>
			<div className="flex flex-col items-center flex-[8]">
				<h2 className="text-xl">{title}</h2>
				<p>{message}</p>
			</div>
			<AiFillCloseCircle
				size="26"
				className="cursor-pointer"
				onClick={notificationCtx.hideNotification}
			/>
		</div>
	);
}

export default Notification;
