import isNull from "lodash/isNull";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSmile } from "react-icons/ai";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";

function StoryCard({ story }) {
	dayjs.extend(advanceFormat);
	const { slug, title, publishedAt, coverImage, readTime, author } = story;
	const coverImagePath = `${coverImage.url}`;
	const linkPath = `/${slug}`;
	const authorName = `${author.firstName} ${author.lastName}`;
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = !isNull(author.profilePicture?.data)
		? `${author.profilePicture.data.attributes.url}`
		: null;

	return (
		<article className="grid grid-rows-[auto_minmax(80px,_auto)_70px] gap-0 border-[1px] border-gray-300 bg-slate-100 rounded-b-lg hover:shadow-md dark:hover:shadow-none dark:bg-gray-800">
			<Link href={linkPath}>
				<a>
					<div className="relative max-w-full h-[300px]">
						<Image
							className="duration-300 ease-in hover:scale-110"
							// unoptimized
							// loader={({ src }) => {
							// 	return src;
							// }}
							src={coverImagePath}
							alt={story.slug}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</a>
			</Link>

			<div className="flex p-2 text-xl font-semibold hover:underline">
				<Link href={linkPath}>
					<a className="flex-1 line-clamp-3">{title}</a>
				</Link>
			</div>
			<div className="flex items-start justify-between m-2">
				<div className="flex items-center justify-start flex-1">
					<Link href="/about">
						<a>
							<div className="relative flex items-center justify-center w-14 h-14">
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
					<div className="flex flex-col pl-4 text-sm">
						<div>{authorName}</div>
						<Link href="/about">
							<a className="hover:underline">
								<div>@{author.username}</div>
							</a>
						</Link>
					</div>
				</div>
				<div className="flex flex-col font-mono text-sm">
					<time>{publishedDate}</time>
					<time>{readTime} min read</time>
				</div>
			</div>
		</article>
	);
}

export default StoryCard;
