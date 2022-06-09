import isEmpty from "lodash/isEmpty";

import StoryContent from "./StoryContent";
import StoryHeader from "./StoryHeader";
import SerialList from "./SerialList";
import RelatedStories from "./RelatedStories";
import Newsletter from "../../ui/NewsLetter";
import {
	GoogleAdsenseVertical,
	GoogleAdsenseInArticle,
} from "components/google-services/GoogleAdsense";

function Story({ story, recommendedStories }) {
	const imagePath = `${story.coverImage.url}`;

	return (
		<div className="flex flex-col max-w-[1600px] m-auto md:grid md:gap-2 md:grid-cols-[minmax(120px,_300px)_minmax(512px,_auto)_minmax(120px,_300px)] md:grid-rows-[900px_auto_auto]">
			<div className="hidden md:inline md:row-start-2 md:row-end-4">
				<GoogleAdsenseVertical
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT_ID}`}
				/>
				<GoogleAdsenseVertical
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT_ID}`}
				/>
			</div>
			<div className="flex flex-col items-center md:row-span-full">
				<StoryHeader
					title={story.title}
					excerpt={story.excerpt}
					image={imagePath}
					author={story.author}
					meta={{
						publishedAt: story.publishedAt,
						readTime: story.readTime,
						updatedAt: story.updatedAt,
						topics: story.topics,
					}}
				/>
				{story.isSeries ? (
					<SerialList
						serialDetail={{ title: story.serial.title, slug: story.serial.slug }}
						stories={story.serial.stories}
						currentPath={`/${story.slug}`}
					/>
				) : null}
				<StoryContent content={story.content} />
				{!isEmpty(recommendedStories) ? <RelatedStories stories={recommendedStories} /> : null}
				<GoogleAdsenseInArticle
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT_ID}`}
				/>
				<section className="w-full max-w-3xl my-14">
					<div className="relative p-5 mx-2 bg-transparent rounded-md shadow-md md:mx-0 shadow-primary-800 dark:shadow-none text-slate-100 newsletter-bg-before-pattern newsletter-bg-after-pattern">
						<div className="absolute bg-[url('/icons/paper-plane.svg')] bg-no-repeat bg-contain w-20 h-20 right-24 -top-10"></div>
						<div className="absolute top-0 left-0 w-full h-full rounded-md bg-primary-600 -z-20"></div>
						<div className="absolute top-0 left-0 w-full h-full rounded-md opacity-80 -z-20 bg-primary-800"></div>
						<div className="flex flex-col items-center">
							<h3 className="font-mono text-2xl font-medium">Newsletter</h3>
							<p className="mb-2 text-sm italic">Get email about new stories.</p>
							<Newsletter />
						</div>
					</div>
				</section>
				<GoogleAdsenseInArticle
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT_ID}`}
				/>
			</div>
			<div className="hidden md:inline md:row-start-2 md:row-end-4">
				<GoogleAdsenseVertical
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT_ID}`}
				/>
				<GoogleAdsenseVertical
					client={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
					slot={`${process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT_ID}`}
				/>
			</div>
		</div>
	);
}

export default Story;
