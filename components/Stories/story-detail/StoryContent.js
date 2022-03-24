import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import StoryHeader from "./StoryHeader";
import classes from "./StoryContent.module.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function StoryContent({ story }) {
	const imagePath = `/images/stories/${story.slug}/${story.image}`;

	return (
		<article className={classes.content}>
			<StoryHeader title={story.title} excerpt={story.excerpt} image={imagePath} />
			<ReactMarkdown
				components={{
					p: ({ node, children }) => {
						if (node.children[0].tagName === "img") {
							const image = node.children[0];

							return (
								<div className={classes.image}>
									<Image
										src={`/images/posts/${story.slug}/${image.properties.src}`}
										alt={image.properties.alt}
										width={600}
										height={300}
									/>
								</div>
							);
						}

						return <p>{children}</p>;
					},
					code: ({ node, inline, className, children, ...props }) => {
						const match = /language-(\w+)/.exec(className || "");
						return !inline && match ? (
							<SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
				}}
			>
				{story.content}
			</ReactMarkdown>
		</article>
	);
}

export default StoryContent;
