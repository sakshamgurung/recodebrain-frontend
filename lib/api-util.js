import axios from "axios";

const strapiAPI = process.env.STRAPI_API;

export async function loadHomePage() {
	const { data } = await axios.get(`${strapiAPI}/home-page`);

	const { featuredStories, storyGrids } = data.data.attributes;

	return {
		featuredStories: featuredStories.stories.data.map(({ attributes, ...o }) => ({
			...o,
			...attributes,
			coverImage: {
				id: attributes.coverImage.data.id,
				...attributes.coverImage.data.attributes,
			},
			author: {
				id: attributes.author.data.id,
				...attributes.author.data.attributes,
			},
		})),
		storyGrids: storyGrids.map(({ topic, stories, ...o }) => ({
			...o,
			topic: { id: topic.data.id, ...topic.data.attributes },
			stories: stories.data.map(({ attributes, ...r }) => ({
				...r,
				...attributes,
				coverImage: {
					id: attributes.coverImage.data.id,
					...attributes.coverImage.data.attributes,
				},
				author: {
					id: attributes.author.data.id,
					...attributes.author.data.attributes,
				},
			})),
		})),
	};
}

export async function loadStoryList() {
	const { data } = await axios.get(`${strapiAPI}/stories?fields[0]=slug`);

	return {
		data: data.data.map(({ attributes, ...o }) => ({ ...o, ...attributes })),
		meta: data.meta,
	};
}

export async function loadStory(slug) {
	const { data } = await axios.get(
		`${strapiAPI}/stories?populate[coverImage][fields][0]=url&populate[author][populate][profilePicture][fields][0]=url&filters[slug][$eq]=${slug}`
	);

	return {
		id: data.data[0].id,
		...data.data[0].attributes,
		coverImage: {
			id: data.data[0].attributes.coverImage.data.id,
			...data.data[0].attributes.coverImage.data.attributes,
		},
		author: {
			id: data.data[0].attributes.author.data.id,
			...data.data[0].attributes.author.data.attributes,
		},
	};
}

export async function loadTopics() {
	const { data } = await axios.get(
		`${strapiAPI}/topics?fields[0]=name&fields[1]=slug&fields[2]=description`
	);

	return {
		data: data.data.map(({ attributes, ...o }) => ({
			...o,
			...attributes,
		})),
		meta: data.meta,
	};
}

export async function loadTopicDetail(slug) {
	const { data } = await axios.get(
		`${strapiAPI}/topics?fields[0]=name&fields[1]=slug&fields[2]=description&filters[slug][$eq]=${slug}`
	);

	return data.data.map(({ attributes, ...o }) => ({
		...o,
		...attributes,
	}))[0];
}

export async function loadStoriesUnderTopic(slug, page) {
	const { data } = await axios.get(
		`${strapiAPI}/stories?fields[0]=title&fields[0]=excerpt&fields[0]=isSeries&fields[0]=slug&fields[0]=publishedAt&fields[0]=readTime&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][3]=url&populate[topics][fields][0]=name&populate[topics][fields][1]=slug&filters[topics][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=12`
	);

	return {
		data: data.data.map(({ attributes, ...o }) => ({
			...o,
			...attributes,
			coverImage: {
				id: attributes.coverImage.data.id,
				...attributes.coverImage.data.attributes,
			},
			author: {
				id: attributes.author.data.id,
				...attributes.author.data.attributes,
			},
			topics: attributes.topics.data.map(({ attributes, ...r }) => ({
				...r,
				...attributes,
			})),
		})),
		meta: data.meta,
	};
}
