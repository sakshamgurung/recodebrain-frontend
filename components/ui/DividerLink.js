import Link from "next/link";
import _ from "lodash";

function DividerLink(props) {
	const { link, children } = props;
	return (
		<h3 className="flex items-center mt-16 mb-12 text-lg font-bold text-center uppercase before:content before:flex-1 before:border-b-[3px] before:border-gray-700 after:content after:flex-1 after:border-b-[3px] after:border-gray-700">
			{_.isEmpty(link) ? (
				<span className="pl-4 pr-4 mx-4 bg-gray-700 rounded-sm text-slate-100">{children}</span>
			) : (
				<Link href={link}>
					<a className="pl-4 pr-4 mx-4 bg-gray-700 rounded-sm text-slate-100 hover:bg-primary-600">
						{children}
					</a>
				</Link>
			)}
		</h3>
	);
}

export default DividerLink;
