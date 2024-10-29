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
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredProjects, setFilteredProjects] = useState(allProjects);

	const projectCategories = [
		"All",
		"3D",
		"AI",
		"Blockchain",
		"Clone",
		"DApp",
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
			// Reset to show all projects when "All" is clicked
			setSelectedCategories([]);
			setFilteredProjects(allProjects);
		} else {
			let updatedCategories = [...selectedCategories];
			if (updatedCategories.includes(category)) {
				updatedCategories = updatedCategories.filter((c) => c !== category);
			} else {
				updatedCategories.push(category);
			}

			setSelectedCategories(updatedCategories);

			if (updatedCategories.length === 0) {
				setFilteredProjects(allProjects);
			} else {
				setFilteredProjects(
					allProjects.filter((project) =>
						updatedCategories.some((cat) => project.categories?.includes(cat))
					)
				);
			}
		}
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
			<div className="container py-6 mx-auto md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Challenges
					</h2>
					<p className="mt-4 text-zinc-400">
						I enjoy taking on new challenges and expanding my knowledge through problem-solving.
						Below are some of my completed challenges. Once they become commercially viable,
						select challenges will be transferred to the "Projects" page. While I believe in open source,
						some challenges contain proprietary algorithms, AI implementations, or commercial potential
						and are therefore available only as demos rather than public repositories.
					</p>
				</div>

				<div className="w-full h-px bg-zinc-800" />
				<div className="space-y-2 w-full">
					{projectCategories.map((category) => (
						<Button
							key={category}
							onClick={() => handleCategoryClick(category)}
							className={
								selectedCategories.includes(category) ||
								(category === "All" && selectedCategories.length === 0)
									? "mr-2 bg-blue-900"
									: "mr-2"
							}
						>
							{category}
						</Button>
					))}
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
