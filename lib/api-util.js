import { data } from "autoprefixer";
import axios from "axios";
import _ from "lodash";

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

export async function loadStoryDetail(slug) {
	const { data } = await axios.get(
		`${strapiAPI}/stories?populate[coverImage][fields][0]=url&populate[author][populate][profilePicture][fields][0]=url&populate[topics][fields][0]=name&populate[topics][fields][1]=slug&populate[serial][populate][stories][fields][0]=title&populate[serial][populate][stories][fields][0]=slug&filters[slug][$eq]=${slug}`
	);

	const story = _.cloneDeep(data.data[0].attributes);

	const temp = {
		id: data.data[0].id,
		...story,
		coverImage: {
			id: story.coverImage.data.id,
			...story.coverImage.data.attributes,
		},
		author: {
			id: story.author.data.id,
			...story.author.data.attributes,
		},
		topics: story.topics.data.map(({ attributes, ...o }) => ({
			...o,
			...attributes,
		})),
	};

	if (temp.isSeries && !_.isNull(story.serial.data)) {
		temp.serial = {
			id: story.serial.data.id,
			...story.serial.data.attributes,
			stories: story.serial.data.attributes.stories.data.map(({ attributes, ...r }) => ({
				...r,
				...attributes,
			})),
		};
	}

	return temp;
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
		`${strapiAPI}/stories?fields[0]=title&fields[1]=excerpt&fields[2]=isSeries&fields[3]=slug&fields[4]=publishedAt&fields[5]=readTime&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][0]=url&filters[topics][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=12`
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
		})),
		meta: data.meta,
	};
}

export async function loadSerialList() {
	const { data } = await axios.get(`${process.env.STRAPI_API}/serials?fields[0]=slug`);

	return {
		data: data.data.map(({ attributes, ...o }) => ({ ...o, ...attributes })),
		meta: data.meta,
	};
}

export async function loadSerials() {
	const { data } = await axios.get(
		`${process.env.STRAPI_API}/serials?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=publishedAt&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][0]=url`
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
		})),
		meta: data.meta,
	};
}

export async function loadSerialDetail(slug) {
	const { data } = await axios.get(
		`${process.env.STRAPI_API}/serials?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=publishedAt&populate[coverImage][fields][0]=url&filters[slug][$eq]=${slug}`
	);

	return data.data.map(({ attributes, ...o }) => ({
		...o,
		...attributes,
		coverImage: {
			id: attributes.coverImage.data.id,
			...attributes.coverImage.data.attributes,
		},
	}))[0];
}

export async function loadStoriesUnderSerial(slug) {
	const { data } = await axios.get(
		`${strapiAPI}/stories?fields[0]=title&fields[1]=excerpt&fields[3]=slug&fields[4]=publishedAt&fields[5]=readTime&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][0]=url&filters[serial][slug][$eq]=${slug}`
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
		})),
		meta: data.meta,
	};
}

export async function loadRecommendedStories(excludedSlug) {
	const { slug, createdAt } = excludedSlug;
	const recommendedStories = [];
	let prevPostsLimit = 1;

	const nextPosts = await axios.get(
		`${strapiAPI}/stories?fields[0]=title&fields[1]=excerpt&fields[3]=slug&fields[4]=publishedAt&fields[5]=readTime&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][0]=url&filters[slug][$ne]=${slug}&filters[createdAt][$gt]=${createdAt}&sort[0]=createdAt&pagination[limit]=2`
	);

	switch (nextPosts.data.data.length) {
		case 0:
			prevPostsLimit = 3;
			break;
		case 1:
			prevPostsLimit = 2;
			break;
		default:
			prevPostsLimit = 1;
	}

	const prevPosts = await axios.get(
		`${strapiAPI}/stories?fields[0]=title&fields[1]=excerpt&fields[3]=slug&fields[4]=publishedAt&fields[5]=readTime&populate[coverImage][fields][0]=url&populate[author][fields][0]=username&populate[author][fields][1]=firstName&populate[author][fields][2]=lastName&populate[author][populate][profilePicture][fields][0]=url&filters[slug][$ne]=${slug}&filters[createdAt][$lt]=${createdAt}&sort[0]=createdAt%3Adesc&pagination[limit]=${prevPostsLimit}`
	);

	if (!_.isEmpty(prevPosts.data.data)) {
		recommendedStories.push(
			...prevPosts.data.data.map(({ attributes, ...o }) => ({
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
			}))
		);
	}

	if (!_.isEmpty(nextPosts.data.data)) {
		recommendedStories.push(
			...nextPosts.data.data.map(({ attributes, ...o }) => ({
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
			}))
		);
	}
	return _.sortBy(recommendedStories, (story) => story.id);
}
