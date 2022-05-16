import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { AiOutlineSmile } from "react-icons/ai";
import moment from "moment";

function StoryHeader({ title, excerpt, image, author, meta }) {
	const { publishedAt, readTime } = meta;
	const authorName = `${author.firstName} ${author.lastName}`;
	const publishedDate = moment(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = !_.isNull(author.profilePicture.data)
		? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${author.profilePicture.data.attributes.url}`
		: null;

	return (
		<header className="flex flex-col max-w-4xl mb-10 mt-7">
			<h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				{title}
			</h1>
			<p className="text-gray-700">{excerpt}</p>
			<div className="flex flex-row items-center justify-start flex-1 my-6 font-mono text-sm">
				<Link href="/about">
					<a>
						<div className="relative w-12 h-12 overflow-hidden rounded-md">
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
			<Image className="rounded-md md:h-80" src={image} alt={title} width={1200} height={650} />
		</header>
	);
}

export default StoryHeader;
