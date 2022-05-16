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
		<article key={slug} className={`${className}`}>
			<div className="flex flex-row items-center border-[1px] border-gray-300 overflow-hidden duration-300 ease-in rounded-md hover:shadow-md hover:scale-105">
				<Link href={linkPath}>
					<a>
						<div className="relative w-[200px] h-[200px]">
							<Image src={coverImagePath} alt={slug} layout="fill" objectFit="cover" />
						</div>
					</a>
				</Link>
				<div className="h-[200px]  flex-1 flex flex-col justify-between py-2 px-3">
					<div>
						<Link href={linkPath}>
							<a className="text-xl font-semibold text-justify hover:underline">{title}</a>
						</Link>
						<p className="mt-2 text-sm text-justify text-gray-600">{excerpt}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start flex-1">
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
			</div>
		</article>
	);
}

export default StoryCardV2;
