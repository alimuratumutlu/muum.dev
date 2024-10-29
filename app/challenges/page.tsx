"use client";

import { allProjects } from "contentlayer/generated";
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

	const projectCategories = [
		"All",
		"3D",
		"AI",
		"Blockchain",
		"Clone",
		"Dashboard",
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
			<div className="container py-6 mx-auto md:space-y-16 px-6 md:pt-24 lg:pt-32 sm:px-0">
				<div className="max-w-2xl mx-auto lg:mx-0 pt-16 sm:pt-0">
					<div className="flex items-center gap-4">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
							Challenges ({sorted.length})
						</h2>
					</div>
					<p className="my-4 text-zinc-400 sm:mb-0">
						I enjoy taking on new challenges and expanding my knowledge through problem-solving.
						Below are some of my completed challenges. Once they become commercially viable,
						select challenges will be transferred to the "Projects" page. While I believe in open source,
						some challenges contain proprietary algorithms, AI implementations, or commercial potential
						and are therefore available only as demos rather than public repositories.
					</p>
				</div>

				<div className="w-full h-px bg-zinc-800" />
				<div className="w-full flex flex-col sm:flex-row gap-4 py-8 sm:py-0">
					<input
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						onChange={handleSearch}
						className="px-4 py-2 bg-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<div className="flex flex-wrap gap-2">
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
				</div>

				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-4">
					{sorted.map((project, i) => (
						<Card key={project.slug}>
							<Article project={project} />
						</Card>
					))}
				</div>

				<div className="hidden w-full h-px md:block bg-zinc-800" />
			</div>
		</div>
	);
}
