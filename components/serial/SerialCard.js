import isNull from "lodash/isNull";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSmile } from "react-icons/ai";

function SerialCard({ serial }) {
	dayjs.extend(advanceFormat);
	const { slug, title, publishedAt, coverImage, author } = serial;
	const coverImagePath = `${coverImage.formats.small.url}`;
	const linkPath = `/serial/${slug}`;
	const authorName = `${author.firstName} ${author.lastName}`;
	const publishedDate = dayjs(publishedAt).format("MMM Do YYYY");
	let profilePicturePath = isNull(author.profilePicture)
		? null
		: `${author.profilePicture.formats.thumbnail.url}`;

	return (
		<article className="grid grid-rows-[auto_minmax(80px,_auto)_70px] gap-0 border-[1px] border-gray-300 dark:bg-gray-800 rounded-b-lg hover:shadow-md dark:hover:shadow-none">
			<Link href={linkPath}>
				<a>
					<div className="relative max-w-full h-[300px]">
						<Image
							className="duration-300 ease-in hover:scale-110"
							src={coverImagePath}
							alt={serial.slug}
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
					<Link href="/about">
						<a>
							<div className="relative flex items-center justify-center w-14 h-14">
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
					<div className="flex flex-col pl-4 text-sm">
						<div>{authorName}</div>
						<Link href="/about">
							<a className="hover:underline">
								<div>@{author.username}</div>
							</a>
						</Link>
					</div>
				</div>
				<div className="flex flex-col pt-1 font-mono text-sm">
					<time>{publishedDate}</time>
				</div>
			</div>
		</article>
	);
}

export default SerialCard;
