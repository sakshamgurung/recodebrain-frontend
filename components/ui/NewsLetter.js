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
			const res = await axios.post("/api/newsletter", data, { timeout: 2000 });
			notificationCtx.showNotification({
				title: "Success!",
				message: "Submission successful. Please check your email inbox for confirmation.",
				status: "success",
			});
		} catch (error) {
			if (error.response) {
				let message = "";
				switch (error.response.data.message.title) {
					case "Invalid Resource":
						message = "Check for empty email or fake looking emails.";
						break;
					case "Member Exists":
						message = "You are already subscribed for to our newsletter.";
						break;
					default:
						message = "Something went wrong!";
				}

				notificationCtx.showNotification({
					title: "Error!",
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
				{formState.isSubmitting ? <span>Loading...</span> : "Subscribe for free"}
			</button>
		</form>
	);
}

export default Newsletter;
