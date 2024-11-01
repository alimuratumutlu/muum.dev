"use client";

import { allNetworks } from "contentlayer/generated";
import Link from "next/link";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "./article";

export default function NetworksPage() {
	const featured1 = allNetworks.find(
		(network) => network.slug === "muum-network"
	);
	const featured2 = allNetworks.find(
		(network) => network.slug === "muum-ai"
	);
	const featured3 = allNetworks.find(
		(network) => network.slug === "muum-dev"
	);


	const topNetworks = [
		"muum-app",
		"muum-bio",
		"muum-codes",
		"muum-digital",
		"muum-games",
		"muum-news",
		"muum-tech",
		].map((slug) => allNetworks.find((network) => network.slug === slug)!);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="container py-6 mx-auto space-y-8 md:space-y-8 md:pt-24 lg:pt-32  px-4 md:px-0">
				<div className="max-w-4xl mx-auto lg:mx-0 mt-16 md:mt-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Muum Network
					</h2>
					<p className="mt-4 text-zinc-400">
						As a developer passionate about AI and community empowerment, I'm building a network of practical web applications that leverage artificial intelligence to solve everyday challenges. The Muum Network combines AI-powered tools with user-friendly interfaces for tasks like shopping, product comparison, and educational resources. By making these tools freely accessible, I aim to help others benefit from AI technology while maintaining sustainability through affiliate partnerships and ethical advertising.
					</p>
				</div>

				<div className="w-full h-px bg-zinc-800" />

				{/* Full-width featured card */}
				<div className="flex flex-col w-full gap-8">
					<Card>
						{featured1 && (
							<Link href={`/network/${featured1.slug}`}>
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
								</article>
							</Link>
						)}
					</Card>
				</div>

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					<Card>
						{featured2 && (
							<Link href={`/network/${featured2.slug}`}>
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
											Read more <span aria-hidden="true">›</span>
										</p>
									</div>
								</article>
							</Link>
						)}
					</Card>
					<div className="flex flex-col w-full gap-8 mx-auto lg:mx-0">
						{topNetworks.slice(0, 2).map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>

					<Card>
						{featured2 && (
							<Link href={`/network/${featured2.slug}`}>
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
											Read more <span aria-hidden="true">›</span>
										</p>
									</div>
								</article>
							</Link>
						)}
					</Card>
					<div className="flex flex-col w-full gap-8 mx-auto lg:mx-0">
						{topNetworks.slice(2, 4).map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>

					<Card>
						{featured3 && (
							<Link href={`/network/${featured3.slug}`}>
								<article className="relative w-full h-full p-4 md:p-8">
									<div className="flex items-center justify-between gap-2">
									<div className="text-xs text-zinc-100">
										{featured3.date ? (
											<time dateTime={new Date(featured3.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured3.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
								</div>

								<h2 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl font-display">
									{featured3.title}
								</h2>
								<p className="mt-4 leading-8 text-zinc-400">
									{featured3.description}
								</p>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
										Read more <span aria-hidden="true">›</span>
									</p>
								</div>
								</article>
							</Link>
						)}
					</Card>
					<div className="flex flex-col w-full gap-8 mx-auto lg:mx-0">
						{topNetworks.slice(4, 6).map((project) => (
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
