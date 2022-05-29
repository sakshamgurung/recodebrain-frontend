import Cors from "cors";
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const cors = Cors({
	methods: ["POST", "HEAD"],
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

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === "POST") {
		const { firstName, email } = req.body;
		try {
			const response = await mailchimp.lists.addListMember(
				process.env.MAILCHIMP_LIST_RECODE_BRAIN_UID,
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
			const message = JSON.parse(error.response.text);
			console.log("Error while subscribing to newsletter:---------------->");
			console.log("Error type: ", message.type);
			console.log("Error title: ", message.title);
			console.log("Error status: ", message.status);
			console.log("Error detail: ", message.detail);
			console.log("Error errors: ", message.errors);
			res.status(error.status).json({ message });
		}
	}
}
