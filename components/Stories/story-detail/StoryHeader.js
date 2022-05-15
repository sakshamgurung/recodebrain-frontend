import Image from "next/image";

function StoryHeader({ title, excerpt, image }) {
	return (
		<header className="flex flex-col mt-7 mb-14">
			<h1 className="mb-2 text-4xl font-bold text-gray-800">{title}</h1>
			<p className="text-gray-700 mb-7">{excerpt}</p>
			<div className="w-full">
				<Image className="rounded-md md:h-80" src={image} alt={title} width={1200} height={650} />
			</div>
		</header>
	);
}

export default StoryHeader;
