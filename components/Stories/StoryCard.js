import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSmile } from "react-icons/ai";

function StoryCard({ story }) {
	const { slug, title, publishedAt, coverImage, readTime, author } = story;
	const coverImagePath = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${coverImage.url}`;
	const linkPath = `/${slug}`;
	const authorName = `${author.firstName} ${author.lastName}`;
	let profilePicturePath = !_.isNull(author.profilePicture?.data)
		? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${author.profilePicture.data.attributes.url}`
		: null;

	const publishedDate = new Date(publishedAt).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<article className="grid grid-rows-[auto_minmax(80px,_auto)_70px] gap-0 border-[1px] border-gray-300 rounded-b-lg hover:shadow-md">
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

			<div className="flex p-2 text-xl font-semibold text-justify hover:underline">
				<Link href={linkPath}>
					<a className="flex-1">{title}</a>
				</Link>
			</div>
			<div className="flex items-start justify-between m-2">
				<div className="flex items-center justify-start flex-1">
					<Link href="#">
						<a>
							<div className="relative flex items-center justify-center w-14 h-14">
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
						<Link href="#">
							<a>
								<div>@{author.username}</div>
							</a>
						</Link>
					</div>
				</div>
				<div className="flex flex-col pt-1 font-mono text-sm">
					<time>{publishedDate}</time>
					<time>{readTime} min read</time>
				</div>
			</div>
		</article>
	);
}

export default StoryCard;
