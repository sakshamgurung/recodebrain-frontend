import Image from "next/image";
import Link from "next/link";
import isNull from "lodash/isNull";
import { AiOutlineSmile } from "react-icons/ai";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";

function StoryCardV2({ story, className }) {
	dayjs.extend(advanceFormat);
	const { author, coverImage, excerpt, publishedAt, readTime, slug, title } = story;
	const linkPath = `/${slug}`;
	const authorName = `${author.firstName} ${author.lastName}`;
	const coverImagePath = `${coverImage.url}`;
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = !isNull(author.profilePicture?.data)
		? `${author.profilePicture.data.attributes.url}`
		: null;

	return (
		<article
			key={slug}
			className={`h-fit flex flex-col md:flex-row border-[1px] border-gray-300 bg-slate-100 overflow-hidden rounded-md hover:shadow-md dark:hover:shadow-none dark:bg-gray-800 ${className}`}
		>
			<Link href={linkPath}>
				<a>
					<div className="relative w-full h-[200px] md:w-[200px] md:h-[200px]">
						<Image src={coverImagePath} alt={slug} layout="fill" objectFit="cover" />
					</div>
				</a>
			</Link>
			<div className="flex flex-col flex-grow min-w-0 px-3 py-2">
				<Link href={linkPath}>
					<a>
						<h1 className="text-xl font-semibold truncate h-9 hover:underline">{title}</h1>
					</a>
				</Link>
				<p className="text-sm line-clamp-3">{excerpt}</p>
				<div className="flex flex-row items-center justify-between mt-4 md:mt-auto">
					<div className="flex flex-row items-center">
						<Link href="/about">
							<a>
								<div className="relative overflow-hidden rounded-md w-14 h-14">
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
			</div>
		</article>
	);
}

export default StoryCardV2;
