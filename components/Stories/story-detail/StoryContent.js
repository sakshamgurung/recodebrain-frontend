import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function StoryContent({ content }) {
	const components = {
		p: ({ node, children }) => {
			if (node.children[0].tagName === "img") {
				const image = node.children[0];

				return (
					<div className="w-full mt-8 mb-8">
						<Image
							src={image.properties.src}
							alt={image.properties.alt}
							width={1200}
							height={650}
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
	};

	return (
		<article className="max-w-3xl px-5 py-4 prose prose-lg bg-white">
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{content}
			</ReactMarkdown>
		</article>
	);
}

export default StoryContent;
