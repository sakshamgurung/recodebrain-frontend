import Image from "next/image";
import Link from "next/link";

function StoryCard({ story }) {
	const { slug, title, date, image, readTime, author, username } = story;
	const imagePath = `/images/stories/${slug}/${image}`;
	const linkPath = `/${slug}`;

	return (
		<article className="grid grid-rows-[auto_minmax(80px,_auto)_70px] gap-0 border-[1px] border-gray-300 rounded-b-lg hover:shadow-md">
			<Link href={linkPath}>
				<a>
					<div className="relative max-w-full h-[300px]">
						<Image src={imagePath} alt={story.slug} layout="fill" objectFit="cover" />
					</div>
				</a>
			</Link>

			<div className="p-2 text-xl font-semibold text-justify hover:underline">
				<Link href={linkPath}>
					<a>{title}</a>
				</Link>
			</div>
			<div className="flex items-start justify-between m-2">
				<div className="flex items-center justify-start flex-1">
					<Link href="#">
						<a>
							<div className="relative w-14 h-14">
								<Image
									src="/images/test/author-profile.jpg"
									alt="author profile image"
									// width={656.8}
									// height={458.2}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</a>
					</Link>
					<div className="pl-4 text-sm">
						<Link href="#">
							<a>
								<div>@{username}</div>
							</a>
						</Link>
						<div>{author}</div>
					</div>
				</div>
				<div className="pt-1 font-mono text-sm">
					<div>{date}</div>
					<div>{readTime}</div>
				</div>
			</div>
		</article>
	);
}

export default StoryCard;
