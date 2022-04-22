import Image from "next/image";
import Link from "next/link";

import classes from "./StoryCard.module.css";

function StoryCard({ story }) {
	const { slug, title, date, image, readTime, author, username } = story;
	const imagePath = `/images/stories/${slug}/${image}`;
	const linkPath = `/${slug}`;

	return (
		<article className={classes.card}>
			<div className={classes.featuredImage}>
				<Link href={linkPath}>
					<a>
						<Image src={imagePath} alt={story.slug} layout="fill" objectFit="cover" />
					</a>
				</Link>
			</div>
			<div className={classes.storyTitle}>
				<Link href={linkPath}>
					<a>{title}</a>
				</Link>
			</div>
			<div className={classes.meta}>
				<div className={classes.profileMeta}>
					<Link href="#">
						<a>
							<div className={classes.profileImage}>
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
					<div className={classes.profileName}>
						<Link href="#">
							<a>
								<div>@{username}</div>
							</a>
						</Link>
						<div>{author}</div>
					</div>
				</div>
				<div className={classes.storyMeta}>
					<div>{date}</div>
					<div>{readTime}</div>
				</div>
			</div>
		</article>
	);
}

export default StoryCard;
