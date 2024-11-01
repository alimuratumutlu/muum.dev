"use client";

import type { Project } from "@/.contentlayer/generated";
import { Construction, Eye } from "lucide-react";
import { useState } from "react";

type Props = {
	project: Project;
	views?: number;
	onClick?: () => void;
};
export const Article: React.FC<Props> = ({ project, views, onClick }) => {
	const [showAllTech, setShowAllTech] = useState(false);
	
	return (
		<article className="p-4 md:p-8">
			<div className="flex justify-between gap-2 items-center">
				<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange pb-2">
					{project.date ? (
						<time dateTime={new Date(project.date).toISOString()}>
							{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
								new Date(project.date)
							)}
						</time>
					) : (
						<span>SOON</span>
					)}
				</span>
				{views && (
					<span className="text-zinc-500 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				)}
			</div>
			<div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
				<h2 className="z-20 text-xl font-medium duration-1000 text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				{project.url ? (
					<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
				) : (
					<Construction className="w-4 h-4 text-yellow-500 animate-pulse" />
				)}
			</div>
			<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200 cursor-pointer" onClick={onClick}>
				{project.description}
			</p>
			
			{/* Tech Stack Badges */}
			{project.techStack && (
				<div className="flex flex-wrap gap-2 mt-4">
					{project.techStack
						.slice(0, showAllTech ? undefined : 4)
						.map((tech) => (
							<span
								key={tech}
								className="px-2 py-1 text-xs text-zinc-400 bg-zinc-800/50 rounded-full 
								border border-zinc-700/50 hover:border-zinc-700 transition-colors"
							>
								{tech}
							</span>
					))}
					{!showAllTech && project.techStack.length > 4 && (
						<button
							onClick={() => setShowAllTech(true)}
							className="px-2 py-1 text-xs text-zinc-400 bg-zinc-800/50 rounded-full 
							border border-zinc-700/50 hover:border-zinc-700 hover:text-zinc-200 
							transition-colors cursor-pointer"
						>
							+{project.techStack.length - 4}
						</button>
					)}
				</div>
			)}
		</article>
	);
};
