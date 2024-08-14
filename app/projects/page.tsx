"use client";

import { allProjects } from "contentlayer/generated";
import Link from "next/link";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "./article";

export const revalidate = 60;

export default function ProjectsPage() {
	// Featured and top projects (unchanged)
	const featured1 = allProjects.find((project) => project.slug === "muum-ai")!;
	const featured2 = allProjects.find(
		(project) => project.slug === "muum-network"
	)!;
	const topProjects = [
		"muum-app",
		"muum-codes",
		"muum-digital",
		"muum-tech",
	].map((slug) => allProjects.find((project) => project.slug === slug)!);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Projects
					</h2>
					<p className="mt-4 text-zinc-400">
						Some of the projects are from work and some are on my own time
					</p>
				</div>

				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					<Card>
						<Link href={`/projects/${featured1.slug}`}>
							<article className="relative w-full h-full p-4 md:p-8">
								<div className="flex items-center justify-between gap-2">
									<div className="text-xs text-zinc-100">
										{featured1.date ? (
											<time dateTime={new Date(featured1.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured1.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
								</div>

								<h2 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl font-display">
									{featured1.title}
								</h2>
								<p className="mt-4 leading-8 text-zinc-400">
									{featured1.description}
								</p>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
										Read more <span aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</article>
						</Link>
					</Card>

					<div className="flex flex-col w-full gap-8 mx-auto lg:mx-0">
						{topProjects.slice(0, 2).map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>

					<Card>
						<Link href={`/projects/${featured2.slug}`}>
							<article className="relative w-full h-full p-4 md:p-8">
								<div className="flex items-center justify-between gap-2">
									<div className="text-xs text-zinc-100">
										{featured2.date ? (
											<time dateTime={new Date(featured2.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured2.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
								</div>

								<h2 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl font-display">
									{featured2.title}
								</h2>
								<p className="mt-4 leading-8 text-zinc-400">
									{featured2.description}
								</p>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
										Read more <span aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</article>
						</Link>
					</Card>

					<div className="flex flex-col w-full gap-8 mx-auto lg:mx-0">
						{topProjects.slice(2).map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>
				</div>

				<div className="hidden w-full h-px md:block bg-zinc-800" />
			</div>
		</div>
	);
}
