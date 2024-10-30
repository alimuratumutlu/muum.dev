"use client";

import { Dialog } from "@headlessui/react";
import { allProjects } from "contentlayer/generated";
import { Filter, LayoutGrid, TableProperties, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { FilterSidebar } from "../components/filter-sidebar";
import { Navigation } from "../components/nav";
import { UrlModal } from "../components/url-modal";
import { Article } from "./article";

export const revalidate = 60;

type SortConfig = {
	key: 'title' | 'description' | 'date' | 'categories';
	direction: 'asc' | 'desc';
};

export default function ProjectsPage() {
	// Add new type for filters
	type FilterType = 'categories' | 'techStack' | 'platforms';
	const tableRef = useRef<HTMLDivElement>(null);

	// State for selected categories and filtered projects
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [filteredProjects, setFilteredProjects] = useState(allProjects);
	const [layout, setLayout] = useState<'grid' | 'table'>('grid');
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
	const [modalUrl, setModalUrl] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

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

	const projectPlatforms = [
		"All",
		"Android",
		"Browser",
		"ChatGPT",
		"iOS",
		"MacOS",
		"Shopify",
		"WatchOS",
		"Web",
		"Windows",
		"Wordpress"
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

	// Refactored filter logic
	const applyFilters = (
		projects: typeof allProjects,
		categories: string[],
		techStack: string[],
		platforms: string[],
		search: string
	) => {
		return projects.filter((project) => {
			const matchesCategories = categories.length === 0 || 
				categories.some(cat => project.categories?.includes(cat));
			
			const matchesTechStack = techStack.length === 0 || 
				techStack.some(tech => project.techStack?.includes(tech));
			
			const matchesPlatforms = platforms.length === 0 || 
				platforms.some(platform => project.platforms?.includes(platform));
			
			const matchesSearch = !search || 
				project.title.toLowerCase().includes(search.toLowerCase()) ||
				project.description.toLowerCase().includes(search.toLowerCase());

			return matchesCategories && matchesTechStack && matchesPlatforms && matchesSearch;
		});
	};

	// Updated handlers
	const handleFilterClick = (filter: string, type: FilterType) => {
		if (filter === "All") {
			if (type === 'categories') setSelectedCategories([]);
			else if (type === 'techStack') setSelectedTechStack([]);
			else setSelectedPlatforms([]);
		} else {
			const updateFilters = (prev: string[]) => {
				if (prev.includes(filter)) {
					return prev.filter((f) => f !== filter);
				}
				return [...prev, filter];
			};

			if (type === 'categories') {
				setSelectedCategories((prev) => updateFilters(prev));
			} else if (type === 'techStack') {
				setSelectedTechStack((prev) => updateFilters(prev));
			} else {
				setSelectedPlatforms((prev) => updateFilters(prev));
			}
		}

		// Apply all filters
		const updatedProjects = applyFilters(
			allProjects,
			type === 'categories' ? 
				(filter === "All" ? [] : selectedCategories.includes(filter) ? 
					selectedCategories.filter(f => f !== filter) : 
					[...selectedCategories, filter]) : 
				selectedCategories,
			type === 'techStack' ? 
				(filter === "All" ? [] : selectedTechStack.includes(filter) ? 
					selectedTechStack.filter(f => f !== filter) : 
					[...selectedTechStack, filter]) : 
				selectedTechStack,
			type === 'platforms' ? 
				(filter === "All" ? [] : selectedPlatforms.includes(filter) ? 
					selectedPlatforms.filter(f => f !== filter) : 
					[...selectedPlatforms, filter]) : 
				selectedPlatforms,
			searchQuery
		);
		setFilteredProjects(updatedProjects);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);
		
		const filtered = applyFilters(
			allProjects,
			selectedCategories,
			selectedTechStack,
			selectedPlatforms,
			query
		);
		setFilteredProjects(filtered);
	};

	// Filter and sort remaining projects
	const sorted = filteredProjects
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
		);

	useEffect(() => {
		const handleScroll = () => {
			if (tableRef.current) {
				const tableTop = tableRef.current.getBoundingClientRect().top;
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSort = (key: SortConfig['key']) => {
		setSortConfig(current => {
			if (current?.key === key) {
				return {
					key,
					direction: current.direction === 'asc' ? 'desc' : 'asc'
				};
			}
			return { key, direction: 'asc' };
		});
	};

	const sortedProjects = [...sorted].sort((a, b) => {
		if (!sortConfig) return 0;

		let compareA, compareB;
		switch (sortConfig.key) {
			case 'title':
				compareA = a.title.toLowerCase();
				compareB = b.title.toLowerCase();
				break;
			case 'description':
				compareA = a.description.toLowerCase();
				compareB = b.description.toLowerCase();
				break;
			case 'categories':
				compareA = a.categories?.join(',').toLowerCase() ?? '';
				compareB = b.categories?.join(',').toLowerCase() ?? '';
				break;
			case 'date':
				compareA = new Date(a.date ?? 0).getTime();
				compareB = new Date(b.date ?? 0).getTime();
				break;
			default:
				return 0;
		}

		if (sortConfig.direction === 'asc') {
			return compareA < compareB ? -1 : 1;
		} else {
			return compareA > compareB ? -1 : 1;
		}
	});

	const handleOpenModal = (url: string) => {
		setModalUrl(url);
	};

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="container py-6 mx-auto md:space-y-8 md:pt-24 lg:pt-32">

				{/* Header Section */}
				<div className="flex flex-col gap-4 ">
					{/* Header Row */}
					<div className="flex items-center justify-between">
						<h1 className="font-bold tracking-tight text-zinc-100 text-4xl">
							Portfolio
						</h1>
						<div className="flex items-center gap-4">
							<Button 
								onClick={() => setIsFilterOpen(true)} 
								variant="outline" 
								className="flex items-center gap-2 lg:hidden"
							>
								<Filter className="h-4 w-4" />
								<span className="text-sm">Filters</span>
							</Button>
						</div>
					</div>

					{/* Controls Row */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex-1 max-w-md">
							<input
								type="text"
								placeholder="Search projects..."
								value={searchQuery}
								onChange={handleSearch}
								className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
							/>
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								onClick={() => setLayout('grid')}
								className={`p-1 ${layout === 'grid' ? 'bg-zinc-800 text-zinc-100 ring-1 ring-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
								aria-pressed={layout === 'grid'}
							>
								<span className="sr-only">Grid view</span>
								<LayoutGrid className="h-4 w-4" />
							</Button>
							<Button
								variant="outline" 
								onClick={() => setLayout('table')}
								className={`p-1 ${layout === 'table' ? 'bg-zinc-800 text-zinc-100 ring-1 ring-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
								aria-pressed={layout === 'table'}
							>
								<span className="sr-only">Table view</span>
								<TableProperties className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-wrap gap-2 max-h-[30vh] overflow-y-auto">
						{projectCategories.map((category) => (
							<button
								key={category}
								onClick={() => handleFilterClick(category, 'categories')}
								className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
									selectedCategories.includes(category)
										? 'bg-zinc-700 text-zinc-100'
										: 'text-zinc-400 hover:text-zinc-100 bg-zinc-800/50 hover:bg-zinc-800'
								}`}
							>
								{category}
							</button>
						))}
					</div>
					<p className="text-sm text-zinc-400 hidden lg:block">
						{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
					</p>
				</div>

				{/* Main Content */}
				<div className="flex gap-6 mt-0">
					{/* Sidebar Filter (Desktop) */}
					<div className="hidden lg:block w-64 mt-0">
						<FilterSidebar
							selectedTechStack={selectedTechStack}
							selectedPlatforms={selectedPlatforms}
							onTechStackChange={(tech) => handleFilterClick(tech, 'techStack')}
							onPlatformChange={(platform) => handleFilterClick(platform, 'platforms')}
							techStack={projectTechStacks}
							platforms={projectPlatforms}
						/>
					</div>

					{/* Projects Grid/List */}
					<div className="flex-1 mt-0">
						{layout === 'grid' ? (
							<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 xs:grid-cols-2  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 ">
								{sorted.map((project) => (
									<Card key={project.slug}>
										<Article project={project}  onClick={() => project.url && handleOpenModal(project.url)} />
									</Card>
								))}
							</div>
						) : (
							<div className="relative overflow-x-auto sm:overflow-x-hidden border border-zinc-800 rounded-lg">
								<div className="max-h-[800px] overflow-y-auto">
									<table className="w-full text-left text-zinc-100 min-w-[640px]">
										<thead className="sticky top-0 z-10">
											<tr className="bg-zinc-900/75 backdrop-blur-sm border-b border-zinc-800">
												<th className="p-4 font-medium text-zinc-400">
													<button 
														onClick={() => handleSort('title')}
														className="flex items-center gap-2 hover:text-zinc-200"
													>
														Name {sortConfig?.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
													</button>
												</th>
												<th className="p-4 font-medium text-zinc-400 hidden md:table-cell">
													<button 
														onClick={() => handleSort('description')}
														className="flex items-center gap-2 hover:text-zinc-200"
													>
														Description {sortConfig?.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
													</button>
												</th>
												<th className="p-4 font-medium text-zinc-400 hidden sm:table-cell">
													<button 
														onClick={() => handleSort('categories')}
														className="flex items-center gap-2 hover:text-zinc-200"
													>
														Categories {sortConfig?.key === 'categories' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
													</button>
												</th>
												<th className="p-4 font-medium text-zinc-400">
													<button 
														onClick={() => handleSort('date')}
														className="flex items-center gap-2 hover:text-zinc-200"
													>
														Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
													</button>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-zinc-800">
											{sortedProjects.map((project) => (
												<tr 
													key={project.slug} 
													className="hover:bg-zinc-800/50 transition-colors cursor-pointer"
													onClick={() => project.url && handleOpenModal(project.url)}
												>
													<td className="p-4 font-medium">{project.title}</td>
													<td className="p-4 text-zinc-300 hidden md:table-cell">{project.description}</td>
													<td className="p-4 text-zinc-300 hidden sm:table-cell">{project.categories?.join(', ')}</td>
													<td className="p-4 text-zinc-300">
														{project.date ? new Date(project.date).toLocaleDateString() : 'No date'}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Filter Modal (Mobile) */}
				<Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} className="relative z-50 lg:hidden">
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
							<div className="flex items-center justify-between mb-4">
								<Dialog.Title className="text-lg font-medium text-zinc-100">
									Filters
								</Dialog.Title>
								<button onClick={() => setIsFilterOpen(false)} className="text-zinc-400 hover:text-zinc-200">
									<X size={20} />
								</button>
							</div>
							<FilterSidebar
								selectedTechStack={selectedTechStack}
								selectedPlatforms={selectedPlatforms}
								onTechStackChange={(tech) => handleFilterClick(tech, 'techStack')}
								onPlatformChange={(platform) => handleFilterClick(platform, 'platforms')}
								techStack={projectTechStacks}
								platforms={projectPlatforms}
							/>
						</Dialog.Panel>
					</div>
				</Dialog>

				<UrlModal
					url={modalUrl ?? ''}
					isOpen={!!modalUrl}
					onClose={() => setModalUrl(null)}
				/>
				{/* Description Section */}
				<div className="mb-8 text-zinc-400 w-full">
					<p className="text-center text-sm mt-4">
						While we maintain a strong commitment to open-source principles, certain solutions incorporate proprietary algorithms, advanced AI implementations, or possess significant commercial potential. In these instances, access is limited to demonstration environments to protect intellectual property and maintain competitive advantage.
					</p>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />
			</div>
		</div>
	);
}

