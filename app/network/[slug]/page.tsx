import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { Redis } from "@upstash/redis";
import { allNetworks } from "contentlayer/generated";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./mdx.css";
import { ReportView } from "./view";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allNetworks
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const network = allNetworks.find((network) => network.slug === slug);

	if (!network) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	const links: { label: string; href: string }[] = [];
	if (network.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${network.repository}`,
		});
	}
	if (network.url) {
		links.push({
			label: "Demo",
			href: network.url,
		});
	}

	return (
		<>
			<div className="relative bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
				<Navigation />
				<div className="container mx-auto relative isolate overflow-hidden py-16 sm:pt-32">
					<div className="max-w-7xl flex flex-col md:flex-row gap-8 items-start">
						{network.youtube && (
							<div className="md:w-1/2">
								<iframe 
									width="100%" 
									height="315" 
									src={`https://www.youtube.com/embed/${network.youtube.split('/').pop()?.split('?')[0]}`}
									className="rounded-lg"
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								></iframe>
							</div>
						)}
						
						<div className="md:w-1/2">
							<div className="mx-auto max-w-2xl lg:mx-0">
								<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
									{network.title}
								</h1>
								<p className="mt-6 text-lg leading-8 text-zinc-300 text-justify">
									{network.description}
								</p>
							</div>

							<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none pb-8">
								<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 md:flex lg:gap-x-6">
									{links.map((link) => (
										<Link
											target="_blank"
											key={link.label}
											href={link.href}
											className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 rounded-md shadow-md bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
										>
											{link.label}
											<span aria-hidden="true" className="ml-2">
												<ChevronRight className="w-5 h-5" />
											</span>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<ReportView slug={network.slug} />
			</div>
			<article className="relative bg-zinc-200">
				<div className="container mx-auto relative isolate overflow-hidden sm:py-8">
					<Mdx code={network.body.code} />
				</div>
			</article>
		</>
	);
}
