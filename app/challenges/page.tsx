"use client";

import { allProjects } from "contentlayer/generated";
import { LayoutGrid, LayoutList, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "./article";

export const revalidate = 60;

export default function ProjectsPage() {
	// State for selected categories and filtered projects
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredProjects, setFilteredProjects] = useState(allProjects);
	const [layout, setLayout] = useState<'grid' | 'table'>('grid');

	const projectCategories = [
		"All",
		"3D",
		"AI",
		"Blockchain",
		"Clone",
		"Dashboard",
		"E-Commerce",
		"Mobile",
		"SaaS",
		"Tool",
		"Web",
	];

	const projectTechStacks = [
		"All",
		"AWS",
		"Bun",
		"Clerk",
		"Cloudinary",
		"Convex",
		"Cypress",
		"Django",
		"Docker",
		"Drizzle",
		"Electron",
		"Ethers.js",
		"Expo",
		"Express",
		"FaceID",
		"Fast API",
		"Fauna",
		"Firebase",
		"Firestore",
		"Flask",
		"Formik",
		"Gatsby",
		"GitHub Actions",
		"GCP",
		"GraphQL",
		"Hasura",
		"Heroku",
		"Honojs",
		"HyGraph",
		"MapBox",
		"MongoDB",
		"MySQL",
		"NestJS",
		"Next.js",
		"NextAuth",
		"Node.js",
		"OpenAI",
		"Oxylabs",
		"Phoenix",
		"PHP",
		"PostgreSQL",
		"PrismaDB",
		"Pupeteer",
		"Pusher",
		"Python",
		"RapidAPI",
		"React",
		"React Native",
		"React Query",
		"Redis",
		"Reanimated",
		"Replicate",
		"Rest API",
		"Server Actions",
		"Serverless",
		"ShadCN",
		"Skia",
		"Socket.io",
		"Solidity",
		"Storybook",
		"Stream",
		"Stripe",
		"Supabase",
		"Tailwind CSS",
		"Three.js",
		"TypeScript",
		"Vercel",
		"WebRTC",
		"Webhooks",
		"Yup",
	];

	// Handle category selection
	const handleCategoryClick = (category: string) => {
		if (category === "All") {
			setSelectedCategories([]);
			// Apply only search filter when resetting categories
			const searchFiltered = searchQuery
				? allProjects.filter(
					(project) =>
						project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						project.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
				: allProjects;
			setFilteredProjects(searchFiltered);
		} else {
			let updatedCategories = [...selectedCategories];
			if (updatedCategories.includes(category)) {
				updatedCategories = updatedCategories.filter((c) => c !== category);
			} else {
				updatedCategories.push(category);
			}

			setSelectedCategories(updatedCategories);

			if (updatedCategories.length === 0) {
				// Apply only search filter when no categories selected
				const searchFiltered = searchQuery
					? allProjects.filter(
						(project) =>
							project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							project.description.toLowerCase().includes(searchQuery.toLowerCase())
					)
					: allProjects;
				setFilteredProjects(searchFiltered);
			} else {
				// Apply both category and search filters
				setFilteredProjects(
					allProjects.filter(
						(project) =>
							updatedCategories.some((cat) => project.categories?.includes(cat)) &&
							(!searchQuery ||
								project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
								project.description.toLowerCase().includes(searchQuery.toLowerCase()))
					)
				);
			}
		}
	};

	// Add search handler
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);

		// Filter projects based on both search and categories
		const filtered = allProjects.filter(
			(project) =>
				(!selectedCategories.length ||
					selectedCategories.some((cat) => project.categories?.includes(cat))) &&
				(!query ||
					project.title.toLowerCase().includes(query.toLowerCase()) ||
					project.description.toLowerCase().includes(query.toLowerCase()))
		);
		setFilteredProjects(filtered);
	};

	// Featured and top projects (unchanged)
	const featured1 = allProjects.find((project) => project.slug === "muum-ai")!;
	const featured2 = allProjects.find(
		(project) => project.slug === "muum-network"
	)!;

	// Filter and sort remaining projects
	const sorted = filteredProjects
		.filter(
			(project) =>
				![featured1.slug, featured2.slug].includes(project.slug) &&
				project.opensource === true
		)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
		);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="container py-12 mx-auto md:space-y-16 px-6 md:pt-24 lg:pt-32 sm:px-0">
				<div className="w-full flex flex-col items-center gap-4 py-8 border-b border-zinc-800">
					<h2 className="font-bold tracking-tight text-zinc-100 sm:text-4xl mb-6">
						Challenges ({sorted.length})
					</h2>
					<div className="relative w-full max-w-2xl">
						<input
							type="text"
							placeholder="Search projects..."
							value={searchQuery}
							onChange={handleSearch}
							className="w-full px-4 py-2 bg-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
						/>
						<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
							{searchQuery && (
								<button
									onClick={() => {
										setSearchQuery("");
										setFilteredProjects(allProjects);
									}}
									className="p-1 hover:bg-zinc-700 rounded-md"
								>
									<X size={16} />
								</button>
							)}
							<button
								onClick={() => setLayout(layout === 'grid' ? 'table' : 'grid')}
								className="p-1 hover:bg-zinc-700 rounded-md"
							>
								{layout === 'grid' ? <LayoutList size={16} /> : <LayoutGrid size={16} />}
							</button>
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-2">
						{projectCategories.map((category) => (
							<Button
								key={category}
								onClick={() => handleCategoryClick(category)}
								className={
									selectedCategories.includes(category) ||
										(category === "All" && selectedCategories.length === 0)
										? "bg-blue-900"
										: ""
								}
							>
								{category}
							</Button>
						))}
					</div>
					<div className="max-w-4xl mx-auto lg:mx-0 sm:pt-0">
						<p className="text-center my-4 text-zinc-400 sm:mb-0">
							I enjoy taking on new challenges and expanding my knowledge through problem-solving.
							Below are some of my completed challenges. Once they become commercially viable,
							selected challenges will be transferred to the "Projects" page. While I believe in open source, some challenges contain proprietary algorithms, AI implementations, or commercial potential and are therefore available only as demos rather than public repositories.
						</p>
					</div>
				</div>

				{layout === 'grid' ? (
					<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-4">
						{sorted.map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-zinc-100">
							<thead className="bg-zinc-800">
								<tr>
									<th className="p-4">Name</th>
									<th className="p-4">Description</th>
									<th className="p-4">Categories</th>
									<th className="p-4">Date</th>
								</tr>
							</thead>
							<tbody>
								{sorted.map((project) => (
									<tr key={project.slug} className="border-b border-zinc-800 hover:bg-zinc-900">
										<td className="p-4">{project.title}</td>
										<td className="p-4">{project.description}</td>
										<td className="p-4">{project.categories?.join(', ')}</td>
										<td className="p-4">{project.date ? new Date(project.date).toLocaleDateString() : 'No date'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<div className="hidden w-full h-px md:block bg-zinc-800" />
			</div>
		</div>
	);
}
