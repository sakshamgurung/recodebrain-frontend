import { useEffect, useContext } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import NotificationContext from "../../store/notification-context";

function Newsletter() {
	const notificationCtx = useContext(NotificationContext);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string(),
		email: Yup.string().email("Invalid email format").required("Email field is empty"),
	});

	const formOptions = {
		resolver: yupResolver(validationSchema),
	};

	const { register, handleSubmit, formState, reset } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState]);

	async function subscribeToNewsletter(data) {
		notificationCtx.showNotification({
			title: "Signing up...",
			message: "Registering for newsletter.",
			status: "pending",
		});

		try {
			const res = await axios.post("/api/newsletter", data, { timeout: 5000 });

			let message = "";

			if (res.data.message) {
				if (res.data.message.title === "Member Resubscribed") {
					message = "Submission successful. You are now resubscribed.";
				}
			} else {
				message = "Submission successful. Please check your email for confirmation.";
			}

			notificationCtx.showNotification({
				title: "Success!",
				message,
				status: "success",
			});
		} catch (error) {
			if (error.response) {
				let title = "";
				let message = "";

				switch (error.response.data.message.title) {
					case "Invalid Resource":
						title = "Error!";
						message = "Check for empty email or fake looking emails.";
						break;
					case "Member Exists":
						title = "Member Exists";
						message = "You are already subscribed to our newsletter.";
						break;
					default:
						title = "Error!";
						message = "Something went wrong!";
				}
				notificationCtx.showNotification({
					title,
					message,
					status: "error",
				});
			} else {
				notificationCtx.showNotification({
					title: "Error!",
					message: "Something went wrong!",
					status: "error",
				});
			}
		}
	}

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(subscribeToNewsletter)}>
			<input
				aria-label="your first name"
				className="newsletter-input"
				name="firstName"
				type="text"
				placeholder="First Name"
				{...register("firstName")}
			/>
			{errors.email ? (
				<span className="text-sm italic text-yellow-400">{errors.email.message}</span>
			) : null}
			<input
				aria-label="your email"
				className="newsletter-input"
				name="email"
				type="email"
				placeholder="example@gmail.com*"
				{...register("email")}
			/>
			<button
				disabled={formState.isSubmitting}
				className="flex justify-center px-20 py-3 text-lg font-semibold transition duration-200 ease-in delay-150 bg-green-600 rounded-md hover:scale-105"
			>
				{formState.isSubmitting ? (
					<span>
						<svg
							aria-label="loading"
							role="status"
							className="inline w-8 h-8 mr-2 animate-spin fill-slate-100"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
					</span>
				) : (
					"Subscribe for free"
				)}
			</button>
		</form>
	);
}

export default Newsletter;
