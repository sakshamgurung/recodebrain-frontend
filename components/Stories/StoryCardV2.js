import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { AiOutlineSmile } from "react-icons/ai";
import moment from "moment";

function StoryCardV2({ story, className }) {
	const { author, coverImage, excerpt, publishedAt, readTime, slug, title } = story;
	const linkPath = `/${slug}`;
	const authorName = `${author.firstName} ${author.lastName}`;
	const coverImagePath = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${coverImage.url}`;
	const publishedDate = moment(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = !_.isNull(author.profilePicture?.data)
		? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${author.profilePicture.data.attributes.url}`
		: null;

	return (
		<article
			key={slug}
			className={`h-[200px] flex flex-row border-[1px] border-gray-300 bg-slate-100 overflow-hidden duration-300 ease-in rounded-md hover:shadow-md hover:scale-105 ${className}`}
		>
			<Link href={linkPath}>
				<a>
					<div className="relative w-[200px] h-[200px]">
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
				<p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>
				<div className="flex items-center justify-between mt-auto">
					<div className="flex flex-row items-center">
						<Link href="/about">
							<a>
								<div className="relative overflow-hidden rounded-md w-14 h-14">
									{_.isNull(author.profilePicture.data) ? (
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
