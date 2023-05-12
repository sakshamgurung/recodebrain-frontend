import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { useTheme } from "next-themes";

import { useLoaded } from "../../store/customHook";

function Footer(props) {
	const loaded = useLoaded();
	const { theme, systemTheme } = useTheme();

	const explore = [
		{
			icons: <BiLinkExternal size="20" />,
			link: "/",
			title: "Home",
		},
		{
			icons: <BiLinkExternal size="20" />,
			link: "/topics",
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

	const siteLogo = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;

			if (currentTheme === "dark") {
				return (
					<Image
						src="/icons/logo/logo-full-white-v2.svg"
						alt="recodebrain white logo"
						layout="fill"
						objectFit="contain"
					/>
				);
			} else {
				return (
					<Image
						src="/icons/logo/logo-full-blue-v2.svg"
						alt="recodebrain dark logo"
						layout="fill"
						objectFit="contain"
					/>
				);
			}
		}
	};

	return (
		<footer className="bg-light dark:bg-dark mt-16 min-h-[12rem] border-t-[1px] dark:border-slate-100 z-20">
			<div className="px-12 py-[5%] flex flex-col md:flex-row md:justify-between">
				<div className="flex flex-col justify-start md:mr-24">
					<Link href="/">
						<a className="relative h-20 w-52" aria-label="Home page link">
							{siteLogo()}
						</a>
					</Link>
					<span className="text-xs font-light">&copy; 2022, Recodebrain</span>
					<Link href="https://www.digitalocean.com/?refcode=71702f3fa552&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
						<a className="pt-6" target="_blank" rel="noopener noreferrer">
							<img src="icons/logo/digital-ocean-badge.svg" alt="DigitalOcean Referral Badge" />
						</a>
					</Link>
				</div>
				<div className="flex flex-row flex-wrap justify-between flex-1 gap-10 mt-16 md:mt-0">
					<div className="flex flex-col items-center">
						<h2 className="mb-8 font-medium uppercase">Explore</h2>
						<ul className="flex flex-col space-y-4">
							{explore.map((e, index) => (
								<li key={index}>
									<Link href={e.link}>
										<a className="flex flex-row items-center">{e.title}</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="mb-8 font-medium uppercase">Connect</h2>
						<ul className="flex flex-col space-y-4">
							{connects.map((connect, index) => (
								<li key={index}>
									<Link href={connect.link}>
										<a
											className="flex flex-row items-center"
											target="_blank"
											rel="noopener noreferrer"
										>
											{connect.icons}
											<span className="ml-4">{connect.title}</span>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="mb-8 font-medium uppercase">Powered By</h2>
						<ul className="flex flex-col space-y-4">
							{poweredBy.map((tech, index) => (
								<li key={index}>
									<Link href={tech.link}>
										<a
											className="flex flex-row items-center"
											target="_blank"
											rel="noopener noreferrer"
										>
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
