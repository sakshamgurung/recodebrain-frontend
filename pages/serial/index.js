const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";

import isEmpty from "lodash/isEmpty";

import FullGrid from "../../components/ui/FullGrid";
import SerialCard from "../../components/serial/SerialCard";
import { loadSerials } from "../../lib/api-util";

function AllSerialPage(props) {
	const { serials } = props;

	return (
		<Fragment>
			<Head>
				<title>All Serial / Series | RecodeBrain</title>
				<meta name="description" content="Multi part series" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/serial`} />
			</Head>

			<div className="mt-8 m-auto max-w-[1200px]">
				<h1 className="mb-8 text-4xl font-semibold text-center">Serials</h1>
				{props.notFound ? (
					<h1 className="px-12 py-6 mt-6 text-2xl font-light text-center bg-white rounded-md shadow-md dark:shadow-none dark:bg-gray-800">
						Sorry 😔 there are no series right now.
					</h1>
				) : (
					<FullGrid>
						{serials.data.map((serial) => {
							return <SerialCard key={serial.slug} serial={serial} />;
						})}
					</FullGrid>
				)}
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const serials = await loadSerials();

	if (isEmpty(serials.data)) {
		return { props: { notFound: true }, revalidate: 3600 };
	}

	return {
		props: {
			notFound: false,
			serials,
		},
		revalidate: 3600,
	};
}

export default AllSerialPage;
