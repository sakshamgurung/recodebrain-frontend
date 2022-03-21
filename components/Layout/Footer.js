import { useState, useEffect } from "react";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import classes from "./Footer.module.css";

function Footer(props) {
	const [enteredEmail, setEnteredEmail] = useState("");

	async function subscribeToNewsletter(event) {
		event.preventDefault();
	}

	return (
		<footer className={classes.footer}>
			<div className={classes.logo}>RecodeBrain</div>
			<div className={classes.rightContainer}>
				<div className={classes.newsletter}>
					<h3>Newsletter</h3>
					<p>Get email about new stories.</p>
					<form className={classes.newsletterForm} onSubmit={subscribeToNewsletter}>
						<input
							className={classes.newsletterField}
							type="email"
							id="email"
							required
							value={enteredEmail}
							placeholder="name@gmail.com"
							onChange={(event) => setEnteredEmail(event.target.value)}
						/>
						<button className={classes.subscribeBtn}>Subscribe for free</button>
					</form>
				</div>
				<ul className={classes.socialLinks}>
					<li>
						<Link href="#">
							<a>
								<FaLinkedin size="1.5em" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<FaGithub size="1.5em" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<FaDev size="1.5em" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>
								<AiOutlineMail size="1.5em" />
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
