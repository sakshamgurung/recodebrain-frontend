import { useRouter } from "next/router";
import _ from "lodash";
import ReactPagination from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import FullGrid from "../../components/ui/FullGrid";
import StoryCard from "../../components/stories/StoryCard";
import { loadStoriesUnderTopic, loadTopics, loadTopicDetail } from "../../lib/api-util";

function TopicPage(props) {
	const router = useRouter();

	const paginationHandler = (page) => {
		const currentPath = router.pathname;
		const currentQuery = { ...router.query };
		currentQuery.page = page.selected + 1;
		router.push({ pathname: currentPath, query: currentQuery });
	};

	const { topic } = props;
	const topicDetail = (
		<div className="flex flex-col m-4 mb-8 space-y-2">
			<h1 className="text-4xl font-semibold text-center">{topic.name}</h1>
			<p className="text-lg font-medium text-center">{topic.description}</p>
		</div>
	);

	if (props.notFound) {
		return (
			<div className="m-auto mt-8 rounded-md shadow-md max-w-[1200px] bg-white px-12 py-6">
				{topicDetail}
				<h1 className="mt-6 text-2xl font-light text-center">
					Sorry :( no stories related to this topic.
				</h1>
			</div>
		);
	}

	const { stories } = props;
	const { pagination } = stories.meta;

	return (
		<div className="mt-8 m-auto max-w-[1200px]">
			{topicDetail}
			<FullGrid className="mt-4">
				{stories.data.map((story) => (
					<StoryCard key={story.slug} story={story} />
				))}
			</FullGrid>
			<ReactPagination
				previousLabel={<MdKeyboardArrowLeft size="24" />}
				nextLabel={<MdKeyboardArrowRight size="24" />}
				breakLabel="..."
				initialPage={pagination.page - 1}
				pageCount={pagination.pageCount}
				marginPagesDisplayed={2}
				onPageChange={paginationHandler}
				containerClassName="mt-8 mr-4 flex justify-end items-center"
				pageClassName="mx-2"
				pageLinkClassName="p-4 flex rounded-sm shadow-md hover:bg-gray-300"
				activeClassName="rounded-sm bg-blue-500 text-slate-100 pointer-events-none"
			/>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { slug } = context.params;
	const query = context.query;
	const page = query.page || 1;

	const stories = await loadStoriesUnderTopic(slug, page);
	const topic = await loadTopicDetail(slug);

	if (_.isEmpty(stories.data)) {
		return { props: { notFound: true, topic } };
	}

	return {
		props: {
			notFound: false,
			topic,
			stories,
		},
	};
}

export default TopicPage;
