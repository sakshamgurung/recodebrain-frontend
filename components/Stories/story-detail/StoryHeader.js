import Image from "next/image";
import Link from "next/link";
import isNull from "lodash/isNull";
import { AiOutlineSmile } from "react-icons/ai";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
import RelatedTopics from "./RelatedTopics";

function StoryHeader({ title, excerpt, image, author, meta }) {
	dayjs.extend(advanceFormat);
	const { publishedAt, readTime, topics } = meta;
	const authorName = `${author.firstName} ${author.lastName}`;
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = !isNull(author.profilePicture.data)
		? `${author.profilePicture.data.attributes.url}`
		: null;

	return (
		<header className="flex flex-col w-full max-w-4xl mb-10 mt-7">
			<RelatedTopics topics={topics} />
			<h1 className="py-1 mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				{title}
			</h1>
			<p className="dark:text-slate-300">{excerpt}</p>
			<div className="flex flex-row items-center justify-start flex-1 my-6 font-mono text-sm">
				<Link href="/about">
					<a>
						<div className="relative w-12 h-12 overflow-hidden rounded-md">
							{isNull(author.profilePicture.data) ? (
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
			<div className="relative w-[896px] h-[650px]">
				<Image
					className="rounded-md md:h-80"
					src={image}
					alt={title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</header>
	);
}

export default StoryHeader;
