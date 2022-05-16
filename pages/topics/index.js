import Link from "next/link";

import { loadTopics } from "../../lib/api-util";

function AllTopicsPage(props) {
	const { topics } = props;

	return (
		<div className="mt-8 m-auto max-w-[1200px]">
			<h1 className="mb-8 text-4xl font-semibold text-center">Topics</h1>
			<ul className="px-12 py-6 text-2xl font-medium text-gray-800 list-disc list-inside bg-white rounded-md shadow-md marker:text-gray-400">
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
	);
}

export async function getStaticProps() {
	const topics = await loadTopics();

	return {
		props: {
			topics,
		},
	};
}

export default AllTopicsPage;
