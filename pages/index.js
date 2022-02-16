import { Fragment } from "react";

function HomePage() {
	return (
		<div className="bg-gradient-to-tr from-cyan-600 via-emerald-500 to-red-400 h-screen text-slate-200 font-body">
			<header className="pt-10">
				<h1 className="text-5xl text-center">Welcome to</h1>
				<div className="flex justify-center">
					<h1 className="bg-gray-900 pl-2 text-5xl font-bold font-mono text-center">Recode</h1>
					<h1 className="border-4 pl-2 border-gray-900 text-5xl font-bold font-mono text-center">
						Brain!
					</h1>
				</div>
			</header>
			<main className="mt-10">
				<div className="top-10 mx-32 text-lg text-center text-gray-900">
					<p>
						Recode Brain is going to be a blog site. Topics will be on web development, networking,
						programming concept, and programming languages. Later on, I will add tutorial series,
						project demos, and many more. This page is for server tests only.
					</p>
				</div>
			</main>
		</div>
	);
}

export default HomePage;
