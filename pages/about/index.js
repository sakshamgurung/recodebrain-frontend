const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import { useLoaded } from "../../store/customHook";

function AboutPage() {
	const loaded = useLoaded();
	const { theme, systemTheme } = useTheme();

	const aboutImage = () => {
		if (loaded) {
			const currentTheme = theme === "system" ? systemTheme : theme;

			if (currentTheme === "dark") {
				return (
					<Image
						src="/images/profile-dark.PNG"
						alt="Image of recodebrain.com author"
						width={310}
						height={438.5}
					/>
				);
			} else {
				return (
					<Image
						src="/images/profile.PNG"
						alt="Image of recodebrain.com author"
						width={310}
						height={438.5}
					/>
				);
			}
		}
	};

	return (
		<Fragment>
			<Head>
				<title>About | RecodeBrain</title>
				<meta name="description" content="About page of recodebrain.com" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/about}`} />
			</Head>
			<div className="max-w-[1200px] m-auto mt-8">
				<h1 className="mb-8 text-4xl font-semibold text-center">About recodebrain</h1>
				<div className="px-12 py-6 space-y-4 text-lg bg-white rounded-md shadow-md dark:shadow-none dark:bg-gray-800 font-base">
					<div className="m-auto flex flex-row rounded-md shadow-md w-[310px] h-[438.5] overflow-clip">
						{aboutImage()}
					</div>
					<p>
						Recode brain is a site where I, as a fellow developer, want to share my idea, and
						knowledge. I will be sharing topics related to web technologies, programming, software
						development, networking, and many more.
					</p>
					<p>
						I created <span className="font-bold">recodebrain</span>:
						<ul className="list-disc list-inside">
							<li>to add value through knowledge sharing</li>
							<li>to keep learning and add value to myself</li>
						</ul>
					</p>
					<p>Happy Coding 🎉</p>
					<p>
						<ul>
							<li>Sakchhyam</li>
							<ul>
								<li className="italic">sakchhyam@recodebrain.com</li>
							</ul>
						</ul>
					</p>
				</div>
			</div>
		</Fragment>
	);
}

export default AboutPage;
