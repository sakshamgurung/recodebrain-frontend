const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";

import FullGrid from "../../components/ui/FullGrid";
import SerialCard from "../../components/serial/SerialCard";
import { loadSerials } from "../../lib/api-util";

function AllSerialPage(props) {
	const { serials } = props;

	return (
		<Fragment>
			<Head>
				<meta name="description" content="Multi part series" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/serial`} />
			</Head>

			<div className="mt-8 m-auto max-w-[1200px]">
				<h1 className="mb-8 text-4xl font-semibold text-center">Serials</h1>
				<FullGrid>
					{serials.data.map((serial) => {
						return <SerialCard key={serial.slug} serial={serial} />;
					})}
				</FullGrid>
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const serials = await loadSerials();

	return {
		props: {
			serials,
		},
	};
}

export default AllSerialPage;
