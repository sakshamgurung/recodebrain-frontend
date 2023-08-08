import Cors from "cors";
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const cors = Cors({
	methods: ["POST", "PUT", "HEAD"],
});

function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

function newsletterErrorLog(message) {
	console.log("Error type: ", message.type);
	console.log("Error title: ", message.title);
	console.log("Error status: ", message.status);
	console.log("Error detail: ", message.detail);
	console.log("Error errors: ", message.errors);
}

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === "POST") {
		const { firstName, email } = req.body;
		try {
			const response = await mailchimp.lists.addListMember(
				process.env.MAILCHIMP_LIST_RECODE_BRAIN_ID,
				{
					email_address: email,
					status: "pending",
					merge_fields: {
						FNAME: firstName,
					},
				}
			);
			res.status(200).json(response);
		} catch (error) {
			console.log("<----------------Error in newsletter----------------->");
			console.log(error);
			const message = JSON.parse(error.response.text);

			if (message.status === 400 && message.title === "Member Exists") {
				const memberInfo = await mailchimp.lists.getListMember(
					process.env.MAILCHIMP_LIST_RECODE_BRAIN_ID,
					email
				);

				if (memberInfo.status === "unsubscribed") {
					try {
						const updateResponse = await mailchimp.lists.updateListMember(
							process.env.MAILCHIMP_LIST_RECODE_BRAIN_ID,
							email,
							{
								email_address: email,
								status: "subscribed",
								merge_fields: {
									FNAME: firstName,
								},
							}
						);

						updateResponse.message = { title: "Member Resubscribed" };

						res.status(200).json(updateResponse);
					} catch (updateError) {
						const updateErrorMsg = JSON.parse(updateError.response.text);
						console.log("Error while updating subscriber's info:-------------------->");
						newsletterErrorLog(updateErrorMsg);
						res.status(updateError.status).json({ message: updateErrorMsg });
					}
				} else {
					console.log("Error while subscribing to newsletter:---------------->");
					newsletterErrorLog(message);
					res.status(error.status).json({ message });
				}
			} else {
				console.log("Error while subscribing to newsletter:---------------->");
				newsletterErrorLog(message);
				res.status(error.status).json({ message });
			}
		}
	}
}
