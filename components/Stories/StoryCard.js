import Image from "next/image";
import Link from "next/link";

import classes from "./StoryCard.module.css";

function StoryCard() {
	return (
		<article className={classes.card}>
			<div className={classes.featuredImage}>
				<Link href="#">
					<a>
						<Image
							src="/images/test/post-tumbnail-2.jpg"
							alt="featured image"
							layout="fill"
							objectFit="cover"
						/>
					</a>
				</Link>
			</div>
			<div className={classes.storyTitle}>
				<Link href="#">
					<a>
						The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
						aliqua.
					</a>
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
								<div>@Username</div>
							</a>
						</Link>
						<div>Author name</div>
					</div>
				</div>
				<div className={classes.storyMeta}>
					<div>Published date</div>
					<div>Read time</div>
				</div>
			</div>
		</article>
	);
}

export default StoryCard;
