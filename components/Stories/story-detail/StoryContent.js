/** @jsxImportSource @emotion/react */
import { useState } from "react";

import Image from "next/image";
import classNames from "classnames";
import { css as emotionCSS } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import rangeParser from "parse-numeric-range";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import generateSlug from "../../../lib/generateSlug";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function StoryContent({ content }) {
	const styleMarkdown = emotionCSS({
		h3: {
			position: "relative",
			margin: "0 0 1.5rem",
			scrollMarginTop: "4rem",
			a: {
				textDecoration: "none",
				"&:hover": {
					"&::before": {
						content: '"#"',
						position: "absolute",
						top: -1,
						left: -17,
						fontFamily: "var(--code-font)",
						fontWeight: "bold",
						color: "var(--code-highlight)",
					},
				},
			},
		},
		blockquote: {
			borderLeftColor: "var(--code-color)",
			fontWeight: "normal",
			fontSize: "1rem",
		},
		".note": {
			paddingTop: "1rem",
			border: "1px solid gray",
			borderRadius: "0.4rem",
			p: {
				position: "relative",
				marginBottom: "0",
				padding: "1rem",
				fontStyle: "normal",
				fontSize: "1rem",
				fontWeight: "normal",
				"&:before, &:after": {
					position: "absolute",
				},
				"&::before": {
					display: "block",
					top: "-0.9rem",
					content: '""',
					width: 15,
					height: 15,
					background: "var(--icon-info) no-repeat",
					backgroundSize: "contain",
				},
				"&::after": {
					content: '"Note:"',
					left: "2.3rem",
					top: "-1.3rem",
					fontFamily: "var(--code-font)",
				},
			},
		},
		".codeStyle, pre, code, code span": {
			fontFamily: "var(--code-font)",
			fontStyle: "normal",
			fontSize: 14,
			textShadow: "none",
			"@media(min-width: 768px)": {
				fontSize: 16,
			},
		},
		pre: {
			padding: 0,
			margin: "0rem -2rem",
			boxShadow: "0 10px 8px rgb(0, 0, 0,  0.04) , 0 4px 3px rgb(0, 0, 0 , 0.1)",
		},
		".codeStyle": {
			margin: "0px 0px !important",
			backgroundColor: "transparent !important",
			transform: "translateZ(0)",
			minWidth: "100%",
			float: "left",
			'& > span[data="highlight"]': {
				display: "block",
				"&:last-of-type": {
					display: "none",
				},
			},
		},
		code: {
			wordWrap: "break-word",
			color: "var(--code-color)",
			padding: 2,
			"&::before, &::after": {
				content: '"`"',
				color: "var(--code-color)",
			},
		},
		"pre code": {
			fontFamily: "var(--code-font) !important",
			"&::before, &::after": { content: "none" },
		},
		'[data="highlight"]': {
			background: "var(--code-highlight)",
		},
	});

	const components = {
		p: ({ node, children }) => {
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				const metastring = image.properties?.alt;
				const hasCaption = metastring?.toLowerCase().includes("{caption:");
				const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

				return (
					<div className="w-full mt-8 mb-8">
						<Image
							src={image.properties.src}
							alt={image.properties.alt}
							width={1200}
							height={650}
						/>
						{hasCaption ? (
							<div className="font-mono text-base text-center text-gray-600" aria-label={caption}>
								{caption}
							</div>
						) : null}
					</div>
				);
			}

			return <p>{children}</p>;
		},
		a: ({ href, children }) => {
			if (href.match("http")) {
				return (
					<a href={href} target="_blank" rel="noopener noreferrer">
						{children}
					</a>
				);
			}
			return <a href={href}>{children}</a>;
		},
		h3: (props) => {
			const arr = props.children;
			let heading = "";

			for (let i = 0; i < arr.length; i++) {
				if (arr[i]?.type !== undefined) {
					for (let j = 0; j < arr[i].props.children.length; j++) {
						heading += arr[i]?.props?.children[0];
					}
				} else heading += arr[i];
			}

			const slug = generateSlug(heading);
			return (
				<h3 id={slug}>
					<a href={`#${slug}`} {...props}></a>
				</h3>
			);
		},
		pre: (pre) => {
			const codeChunk = pre.node.children[0].children[0].value;
			const [codeCopied, setCodeCopied] = useState(false);

			const handleCopyCode = (codeChunk) => {
				setCodeCopied(true);
				navigator.clipboard.writeText(codeChunk);
				setTimeout(() => {
					setCodeCopied(false);
				}, 2000);
			};

			return (
				<div className="relative group">
					<button
						className={classNames(
							"copyCodeButton active:after:content-[var(--gicon-white-check)] hidden group-hover:block",
							{ "after:content-[var(--gicon-white-check)]": codeCopied },
							{ "after:content-[var(--gicon-white-clone)]": !codeCopied }
						)}
						onClick={() => handleCopyCode(codeChunk)}
					/>
					<pre {...pre}></pre>
				</div>
			);
		},
		code: ({ node, inline, className, children, ...props }) => {
			const match = /language-(\w+)/.exec(className || "");
			const hasMeta = node?.data?.meta;

			const applyHighlights = (applyHighlights) => {
				if (hasMeta) {
					const RE = /{([\d,-]+)}/;
					const metadata = node.data.meta?.replace(/\s/g, "");
					const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)[1] : "0";
					const highlightLines = rangeParser(strlineNumbers);
					const data = highlightLines.includes(applyHighlights) ? "highlight" : null;
					return { data };
				} else {
					return {};
				}
			};

			return !inline && match ? (
				<SyntaxHighlighter
					className="codeStyle"
					style={atomDark}
					language={match[1]}
					PreTag="div"
					showLineNumbers={true}
					wrapLines={hasMeta ? true : false}
					useInlineStyles={true}
					lineProps={applyHighlights}
					{...props}
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
	};

	return (
		<article className="w-full max-w-3xl px-5 py-4 prose prose-lg bg-white">
			<ReactMarkdown
				css={styleMarkdown}
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}

export default StoryContent;
