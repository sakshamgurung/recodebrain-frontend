import { Fragment } from "react/cjs/react.production.min";

import Head from "next/head";
import Image from "next/image";

function PageNotFound() {
	return (
		<Fragment>
			<Head>
				<title>404 | This Page Not Found</title>
				<meta
					name="description"
					content="Blog post about software development, web technology, and programming."
				/>
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
			</Head>
			<div className="flex flex-col items-center justify-center mt-4">
				<div className="relative w-[400px] h-[400px]">
					<Image src="/images/404.svg" alt="404 page not found" layout="fill" objectFit="contain" />
				</div>
				<h1 className="mt-10 text-3xl">404 | Page not Found</h1>
			</div>
		</Fragment>
	);
}

export default PageNotFound;
