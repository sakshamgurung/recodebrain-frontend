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
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { IoIosCopy } from "react-icons/io";
import { MdCheck } from "react-icons/md";

import generateSlug from "../../../lib/generateSlug";

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

function StoryContent({ content }) {
	const styleMarkdown = emotionCSS({
		a: {
			textDecoration: "none",
		},
		h2: {
			position: "relative",
			margin: "1.5rem 0 1rem",
			paddingBottom: "0.4rem",
			scrollMarginTop: "6rem",
			fontWeight: "600",
			borderBottom: " 1px solid #94a3b8",
			// a: {
			"&:hover": {
				"&::before": {
					content: '"#"',
					position: "absolute",
					top: -1,
					left: -20,
					fontFamily: "var(--code-font)",
					fontWeight: "bold",
					color: "var(--code-color)",
				},
			},
			// },
		},
		h3: {
			position: "relative",
			margin: "1.5rem 0 1rem",
			scrollMarginTop: "6rem",
			fontWeight: "600",
			// a: {
			"&:hover": {
				"&::before": {
					content: '"#"',
					position: "absolute",
					top: -1,
					left: -17,
					fontFamily: "var(--code-font)",
					fontWeight: "bold",
					color: "var(--code-color)",
				},
			},
			// },
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
			fontWeight: 500,
			textShadow: "none",
			"@media(min-width: 768px)": {
				fontSize: 16,
			},
		},
		pre: {
			padding: "1rem",
			margin: "0",
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
			"&::before, &::after": {
				content: '"`"',
				color: "var(--code-color)",
			},
		},
		"pre code": {
			fontFamily: "var(--code-font) !important",
			"&::before, &::after": { content: "none" },
			color: "#d1d5db", //gray-300
		},
		"span.linenumber": {
			display: "true !important",
		},
		'[data="highlight"]': {
			background: "var(--code-highlight)",
		},
		"li p": {
			margin: 0,
		},
	});

	const [codeCopied, setCodeCopied] = useState(false);

	const extraHeading = (arr) => {
		let heading = "";
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]?.type !== undefined) {
				for (let j = 0; j < arr[i].props.children.length; j++) {
					heading += arr[i]?.props?.children[0];
				}
			} else heading += arr[i];
		}
		return heading;
	};

	const components = {
		p: ({ node, children }) => {
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				const metastring = image.properties?.alt;
				const isPriority = metastring?.toLowerCase().match("{priority}");
				const hasCaption = metastring?.toLowerCase().includes("{caption:");
				const metaWidth = metastring.match(/{([^}]+)xx/);
				const metaHeight = metastring.match(/xx([^}]+)}/);
				let width = metaWidth ? metaWidth[1] : "768";
				let height = metaHeight ? metaHeight[1] : "432";
				const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

				if (parseInt(width) > 768) {
					width = 768;
					height = 768 * (parseInt(height) / parseInt(width));
				}

				return (
					<div className="w-full mb-4">
						<Image
							src={image.properties.src}
							alt={image.properties.alt}
							width={width}
							height={height}
							objectFit="contain"
							priority={isPriority}
						/>
						{hasCaption ? (
							<div
								className="mb-4 font-mono text-lg italic font-medium text-center"
								aria-label={caption}
							>
								{caption}
							</div>
						) : null}
					</div>
				);
			}

			return <p className="mb-4">{children}</p>;
		},
		a: ({ href, children }) => {
			if (href.match("http")) {
				return (
					<a href={href} target="_blank" rel="noopener noreferrer" aria-label={children[0]}>
						{children}
					</a>
				);
			}
			return <a href={href}>{children}</a>;
		},
		h2: (props) => {
			const arr = props.children;
			const heading = extraHeading(arr);
			const slug = generateSlug(heading);

			return (
				<h2 id={slug}>
					{/* <a href={`#${slug}`} {...props}></a> */}
					{heading}
				</h2>
			);
		},
		h3: (props) => {
			const arr = props.children;
			const heading = extraHeading(arr);
			const slug = generateSlug(heading);

			return (
				<h3 id={slug}>
					{/* <a href={`#${slug}`} {...props}></a> */}
					{heading}
				</h3>
			);
		},
		pre: (pre) => {
			const codeChunk = pre.node.children[0].children[0].value;

			const handleCopyCode = (codeChunk) => {
				setCodeCopied(true);
				navigator.clipboard.writeText(codeChunk);
				setTimeout(() => {
					setCodeCopied(false);
				}, 2000);
			};

			return (
				<div className="relative mb-4">
					<button
						className={classNames(
							"copyCodeButton",
							{ "border-green-600": codeCopied },
							{ "border-gray-600": !codeCopied }
						)}
						onClick={() => handleCopyCode(codeChunk)}
						disabled={codeCopied}
						aria-label="Copy Code"
					>
						{codeCopied === false ? (
							<IoIosCopy size="20" color="#cbd5e1" /> //slate-300
						) : (
							<MdCheck size="20" color="#16a34a" /> //green-600
						)}
					</button>
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
					style={a11yDark}
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
		<article className="w-full px-5 py-4 story-content">
			<ReactMarkdown
				css={styleMarkdown}
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[[rehypeRaw, { passThrough: ["element"] }]]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}

export default StoryContent;
