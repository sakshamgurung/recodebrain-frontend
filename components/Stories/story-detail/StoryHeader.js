import Image from "next/image";

import classes from "./StoryHeader.module.css";

function StoryHeader({ title, excerpt, image }) {
	return (
		<header className={classes.header}>
			<h1 className={classes.title}>{title}</h1>
			<p className={classes.excerpt}>{excerpt}</p>
			<div className={classes.featuredImageContainer}>
				<Image
					className={classes.featuredImage}
					src={image}
					alt={title}
					width={1200}
					height={650}
					// layout="fill"
					// objectFit="cover"
				/>
			</div>
		</header>
	);
}

export default StoryHeader;
