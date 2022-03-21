import Link from "next/link";
import classes from "./DividerLink.module.css";

function DividerLink(props) {
	const { link, children } = props;
	return (
		<h3 className={classes.header}>
			<Link href={link}>
				<a className={classes.link}>{children}</a>
			</Link>
		</h3>
	);
}

export default DividerLink;
