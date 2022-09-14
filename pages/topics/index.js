const { Fragment } = require("react/cjs/react.production.min");

import Head from "next/head";
import Link from "next/link";

import { loadTopics } from "../../lib/api-util";

function AllTopicsPage(props) {
	const { topics } = props;

	return (
		<Fragment>
			<Head>
				<title>All the topics | RecodeBrain</title>
				<meta
					name="description"
					content="Lists of topics or tags are presented. Reader can filter out stories based on tag."
				/>
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/topics`} />
			</Head>
			<div className="mt-8 m-auto max-w-[1200px]">
				<h1 className="mb-8 text-4xl font-semibold text-center">Topics</h1>
				<ul className="px-12 py-6 text-2xl font-medium text-gray-800 list-disc list-inside bg-white rounded-md shadow-md dark:text-slate-100 dark:bg-gray-800 marker:text-gray-500">
					{topics.data.map((topic) => {
						return (
							<li key={topic.id}>
								<Link href={`/topics/${topic.slug}?page=1`}>
									<a>{topic.name}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const topics = await loadTopics();

	return {
		props: {
			topics,
		},
		revalidate: 604800,
	};
}

export default AllTopicsPage;
