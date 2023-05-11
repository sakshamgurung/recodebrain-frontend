import dynamic from "next/dynamic";
import Image from "next/image";
const Link = dynamic(() => import("next/link"));
import isNull from "lodash/isNull";
import { AiOutlineSmile } from "react-icons/ai";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";

const RelatedTopics = dynamic(() => import("./RelatedTopics"));
import StoryShare from "./StoryShare";

function StoryHeader({ title, excerpt, image, author, meta, slug }) {
	dayjs.extend(advanceFormat);
	const { publishedAt, readTime, topics } = meta;
	const authorName = `${author.firstName} ${author.lastName}`;
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = isNull(author.profilePicture)
		? null
		: `${author.profilePicture.formats.thumbnail.url}`;

	return (
		<header className="flex flex-col w-full max-w-4xl px-5 mb-10 mt-7">
			<RelatedTopics topics={topics} />
			<h1 className="py-1 mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				{title}
			</h1>
			<p className="dark:text-slate-300">{excerpt}</p>
			<div className="flex flex-row items-center justify-start flex-1 my-6 font-mono text-sm">
				<Link href="/about">
					<a>
						<div className="relative w-12 h-12 overflow-hidden rounded-md">
							{profilePicturePath === null ? (
								<AiOutlineSmile size="40" />
							) : (
								<Image
									src={profilePicturePath}
									alt="author profile image"
									layout="fill"
									objectFit="cover"
								/>
							)}
						</div>
					</a>
				</Link>
				<div className="flex flex-col pl-4">
					<div className="font-bold">{authorName}</div>
					<Link href="/about">
						<a className="hover:underline">
							<div>@{author.username}</div>
						</a>
					</Link>
				</div>
				<div className="flex flex-row ml-10 space-x-4">
					<time>{publishedDate}</time>
					<time>{readTime} min read</time>
				</div>
			</div>
			<div className="mb-4">
				<StoryShare link={"https://recodebrain.com/" + slug} title={title} />
			</div>
			<div className="relative w-full h-[425px]">
				<Image
					className="rounded-md md:h-80"
					src={image}
					alt={title}
					layout="fill"
					objectFit="cover"
					priority={true}
				/>
			</div>
		</header>
	);
}

export default StoryHeader;
