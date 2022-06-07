import Link from "next/link";

function RelatedTopics({ topics }) {
	return (
		<div className="flex flex-row flex-wrap flex-1 mb-2 space-x-4 font-mono font-bold">
			{topics.map((topic) => (
				<Link href={`/topics/${topic.slug}?page=1`} key={topic.slug}>
					<a className="px-[3px] rounded-sm text-transparent  bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 hover:bg-clip-border hover:text-white">
						#{topic.name.replace(" ", "-").toUpperCase()}
					</a>
				</Link>
			))}
		</div>
	);
}

export default RelatedTopics;
