import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

function Footer(props) {
	const explore = [
		{
			icons: <BiLinkExternal size="20" />,
			link: "/home",
			title: "Home",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "/topcis",
			title: "Topics",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "/serial",
			title: "Serial",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "/about",
			title: "About",
		},
	];

	const connects = [
		{
			icons: <FaLinkedin size="26" />,
			link: "https://www.linkedin.com/in/sakchhyam-gurung/",
			title: "LinkedIn",
		},
		{
			icons: <FaGithub size="26" />,
			link: "https://github.com/sakshamgurung",
			title: "Github",
		},
		{
			icons: <FaDev size="26" />,
			link: "https://dev.to/sakshamgurung",
			title: "Dev.to",
		},
	];

	const poweredBy = [
		{
			icons: <BiLinkExternal size="20" />,
			link: "https://nextjs.org/",
			title: "Next.js",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "https://strapi.io/",
			title: "Strapi",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "https://tailwindcss.com/",
			title: "Tailwindcss",
		},
	];

	return (
		<footer className="bg-primary-700 text-slate-100  mt-16 min-h-[12rem]">
			<div className="px-12 py-[5%] flex flex-col md:flex-row md:justify-between">
				<div className="flex flex-col justify-start md:mr-24">
					<Link href="/">
						<a className="relative h-20 w-52">
							<Image
								src="/icons/logo/logo-full-white-v2.svg"
								alt="recodebrain light logo"
								layout="fill"
								objectFit="contain"
							/>
						</a>
					</Link>
					<span className="text-xs font-light">&copy; 2022, Recodebrain</span>
				</div>
				<div className="flex flex-row flex-wrap justify-between flex-1 gap-10 mt-16 md:mt-0">
					<div className="flex flex-col items-center">
						<h1 className="mb-8 font-medium uppercase">Explore</h1>
						<ul className="flex flex-col space-y-4">
							{explore.map((e, index) => (
								<li key={index}>
									<Link href={e.link}>
										<a className="flex flex-row items-center">
											{e.icons}
											<span className="ml-4">{e.title}</span>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col items-center">
						<h1 className="mb-8 font-medium uppercase">Connect</h1>
						<ul className="flex flex-col space-y-4">
							{connects.map((connect, index) => (
								<li key={index}>
									<Link href={connect.link}>
										<a className="flex flex-row items-center">
											{connect.icons}
											<span className="ml-4">{connect.title}</span>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col items-center">
						<h1 className="mb-8 font-medium uppercase">Powered By</h1>
						<ul className="flex flex-col space-y-4">
							{poweredBy.map((tech, index) => (
								<li key={index}>
									<Link href={tech.link}>
										<a className="flex flex-row items-center">
											{tech.icons}
											<span className="ml-4">{tech.title}</span>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
