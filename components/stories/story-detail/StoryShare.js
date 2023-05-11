import { useState } from "react";
import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));
import classNames from "classnames";

import {
	FacebookShareButton,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	TwitterIcon,
} from "next-share";
import { BsShare, BsCheck2 } from "react-icons/bs";
import { BiLink } from "react-icons/bi";

function StoryShare({ link, title }) {
	const [linkCopied, setLinkCopied] = useState(false);

	const handleCopyLink = (copiedLink) => {
		setLinkCopied(true);
		navigator.clipboard.writeText(copiedLink);
		setTimeout(() => {
			setLinkCopied(false);
		}, 1000);
	};

	return (
		<div className="flex flex-row items-center space-x-4">
			<BsShare size={16} />
			<h2 className="font-mono font-semibold" aria-label="Social media share list">
				Share
			</h2>
			<FacebookShareButton url={link} quote={title} aria-label="Share via Facebook">
				<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton url={link} title={title} aria-label="Share via Twitter">
				<TwitterIcon size={32} round />
			</TwitterShareButton>
			<LinkedinShareButton url={link} aria-label="Share via Linkedin">
				<LinkedinIcon size={32} round />
			</LinkedinShareButton>
			<button
				className={classNames(
					"rounded-full w-[32px] h-[32px] flex justify-center items-center",
					{
						"bg-orange-500": !linkCopied,
					},
					{ "bg-green-600": linkCopied }
				)}
				onClick={() => handleCopyLink(link)}
				aria-label="Copy link on clipboard"
			>
				{linkCopied === true ? (
					<BsCheck2 size={24} color="white" />
				) : (
					<BiLink size={24} color="white" />
				)}
			</button>
		</div>
	);
}

export default StoryShare;
