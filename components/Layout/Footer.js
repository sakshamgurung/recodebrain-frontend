import Link from "next/link";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

function Footer(props) {
	return (
		<footer className="bg-primary-600 text-slate-100 px-[5%] py-[5%] mt-16 min-h-[12rem] flex flex-col justify-center items-center md:flex-row md:justify-between">
			<div className="mx-4 my-4 text-3xl font-medium">RecodeBrain</div>
			<div className="flex flex-col">
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
