const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";
import Image from "next/image";

function AboutPage() {
	return (
		<Fragment>
			<Head>
				<title>About RecodeBrain</title>
				<meta name="description" content="About page of recodebrain.com" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/about}`} />
			</Head>
			<div className="max-w-[1200px] m-auto mt-8">
				<h1 className="mb-8 text-4xl font-semibold text-center">About recodebrain</h1>
				<div className="px-12 py-6 space-y-4 text-lg text-gray-800 bg-white rounded-md shadow-md font-base">
					<div className="m-auto flex flex-row border-[1px] rounded-md shadow-md w-[310px] h-[438.5] overflow-clip">
						<Image src="/images/profile.png" width="310" height="438.5" />
					</div>
					<p>
						Recode brain is a site where I, as a fellow developer, want to share my idea, and
						knowledge. I will be sharing topics related to web technologies, programming, software
						development, networking, and many more.
					</p>
					<p>
						I created <span className="font-bold">recodebrain</span>:
						<ul className="list-disc list-inside marker:text-gray-400">
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
