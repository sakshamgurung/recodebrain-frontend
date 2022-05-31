import StoryCardV2 from "../../components/stories/StoryCardV2";
import { loadSerialDetail, loadSerialList, loadStoriesUnderSerial } from "../../lib/api-util";

function SerialPage(props) {
	const { stories, serial } = props;

	const serialDetail = (
		<div className="flex flex-col m-4 mb-8 space-y-2">
			<h1 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500">
				{serial.title}
			</h1>
			<p className="text-lg font-medium text-center">{serial.description}</p>
		</div>
	);

	return (
		<div className="m-auto mt-8 max-w-[800px]">
			{serialDetail}
			<div className="flex flex-col mx-4 md:mx-0">
				{stories.data.map((story) => (
					<StoryCardV2 key={story.slug} story={story} className="mb-8" />
				))}
			</div>
		</div>
	);
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const stories = await loadStoriesUnderSerial(slug);
	const serial = await loadSerialDetail(slug);

	return {
		props: { stories, serial },
	};
}

export async function getStaticPaths() {
	const serialList = await loadSerialList();
	const slugs = serialList.data.map((serial) => ({ params: { slug: serial.slug } }));
	return {
		paths: slugs,
		fallback: false,
	};
}

export default SerialPage;
