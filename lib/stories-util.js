import fs from "fs";
import path, { format } from "path";

import matter from "gray-matter";

const storiesDirectory = path.join(process.cwd(), "stories");

export function getStoriesFiles() {
	return fs.readdirSync(storiesDirectory);
}

export function getStoryData(postIdentifier) {
	//removes the file extension
	const storySlug = postIdentifier.replace(/\.md$/, "");
	const filePath = path.join(storiesDirectory, `${storySlug}.md`);
	const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

	const postData = {
		slug: storySlug,
		...data,
		content,
	};

	return postData;
}

export function getAllStories() {
	const storiesFiles = getStoriesFiles();

	const allStories = storiesFiles.map((storyFile) => {
		return getStoryData(storyFile);
	});

	const sortedStories = allStories.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

	return sortedStories;
}

export function getFeaturedStories() {
	const allStories = getAllStories();

	const featuredPosts = allStories.filter((post) => post.isFeatured);

	return featuredPosts;
}
