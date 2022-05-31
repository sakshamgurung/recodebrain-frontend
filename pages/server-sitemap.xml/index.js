import { getServerSideSitemap } from "next-sitemap";

import { loadStoryList, loadSerialList } from "../../lib/api-util";

function SiteMap() {}

export async function getServerSideProps(ctx) {
	const stories = await loadStoryList();
	const serials = await loadSerialList();

	const storyFields = stories.data?.map((story) => ({
		loc: `${process.env.NEXT_PUBLIC_SITE_URL}/${story.slug}`,
		lastmod: new Date().toISOString(),
		changefreq: "weekly",
	}));

	const serialFields = serials.data?.map((serial) => ({
		loc: `${process.env.NEXT_PUBLIC_SITE_URL}/serial/${serial.slug}`,
		lastmod: new Date().toISOString(),
		changefreq: "weekly",
	}));
	const fields = [...storyFields, ...serialFields];

	return getServerSideSitemap(ctx, fields);
}

export default SiteMap;
