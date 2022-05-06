import { useState, useEffect } from "react";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

function Footer(props) {
	const [enteredEmail, setEnteredEmail] = useState("");

	async function subscribeToNewsletter(event) {
		event.preventDefault();
	}

	return (
		<footer className="bg-primary-600 text-slate-100 px-[5%] mt-16 min-h-[12rem] flex flex-col justify-center items-center md:flex-row md:justify-between">
			<div className="mx-4 my-4 text-3xl font-medium">RecodeBrain</div>
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h3 className="font-mono text-2xl font-medium">Newsletter</h3>
					<p className="mb-2 text-sm italic">Get email about new stories.</p>
					<form className="flex flex-col gap-2 lg:flex-row" onSubmit={subscribeToNewsletter}>
						<input
							className="p-3"
							type="email"
							id="email"
							required
							value={enteredEmail}
							placeholder="name@gmail.com"
							onChange={(event) => setEnteredEmail(event.target.value)}
						/>
						<button className="flex justify-center px-20 py-3 text-lg font-semibold bg-green-600">
							Subscribe for free
						</button>
					</form>
				</div>
				<ul className="flex my-4 space-x-4">
					<li>
						<Link href="#">
							<a>
								<FaLinkedin size="26" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<FaGithub size="26" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<FaDev size="26" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<AiOutlineMail size="26" />
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
