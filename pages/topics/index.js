import Link from "next/link";

import { loadTopics } from "../../lib/api-util";

function AllTopicsPage(props) {
	const { topics } = props;

	return (
		<div className="m-auto mt-28 rounded-md shadow-md max-w-[1200px] bg-white px-12 py-6">
			<h1 className="mb-6 text-5xl font-bold">Topics</h1>
			<ul className="text-2xl font-medium text-gray-800 list-disc list-inside marker:text-gray-400">
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
