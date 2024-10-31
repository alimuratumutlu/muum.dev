import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export function FilterSidebar({
	selectedTechStack,
	selectedPlatforms,
	onTechStackChange,
	onPlatformChange,
	techStack,
	platforms
}: {
	selectedPlatforms: string[];
	selectedTechStack: string[];
	onPlatformChange: (category: string) => void;
	onTechStackChange: (tech: string) => void;
	platforms: string[];
	techStack: string[];
}) {
	const handleClearPlatforms = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		[...selectedPlatforms].forEach(platform => onPlatformChange(platform));
	};

	const handleClearTechStack = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		[...selectedTechStack].forEach(tech => onTechStackChange(tech));
	};

	const handleClearAll = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		[...selectedPlatforms].forEach(platform => onPlatformChange(platform));
		[...selectedTechStack].forEach(tech => onTechStackChange(tech));
	};

	return (
		<div className="space-y-4">
			<Disclosure defaultOpen>
				{({ open }) => (
					<div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition-colors hover:border-zinc-700">
						<div className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-zinc-100">
							<Disclosure.Button className="flex-1 text-left">
								<span>Platforms</span>
							</Disclosure.Button>
							<div className="flex items-center gap-2">
								{selectedPlatforms.length > 0 && (
									<button
										onClick={handleClearPlatforms}
										className="text-xs text-zinc-400 hover:text-zinc-200 px-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-zinc-700 transition-colors cursor-pointer"
									>
										Clear Filters
									</button>
								)}
								<ChevronDown
									className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-zinc-400`}
								/>
							</div>
						</div>
						<Disclosure.Panel className="mt-2">
							<div className="px-4 space-y-2 max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
								{platforms.map((category) => (
									<label key={category} className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={selectedPlatforms.includes(category)}
											onChange={() => onPlatformChange(category)}
											className="rounded border-zinc-600 bg-zinc-800 text-blue-500 
											cursor-pointer transition-colors hover:border-zinc-500 
											focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 
											focus:ring-offset-transparent"
										/>
										<span className="text-sm text-zinc-300">{category}</span>
									</label>
								))}
							</div>
						</Disclosure.Panel>
					</div>
				)}
			</Disclosure>

			<Disclosure defaultOpen>
				{({ open }) => (
					<div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition-colors hover:border-zinc-700">
						<div className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-zinc-100">
							<Disclosure.Button className="flex-1 text-left">
								<span>Tech Stack</span>
							</Disclosure.Button>
							<div className="flex items-center gap-2">
								{selectedTechStack.length > 0 && (
									<button
										onClick={handleClearTechStack}
										className="text-xs text-zinc-400 hover:text-zinc-200 px-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-zinc-700 transition-colors cursor-pointer"
									>
										Clear Filters
									</button>
								)}
								<ChevronDown
									className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-zinc-400`}
								/>
							</div>
						</div>
						<Disclosure.Panel className="mt-2">
							<div className="px-4 space-y-2 max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
								{techStack.map((tech) => (
									<label key={tech} className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={selectedTechStack.includes(tech)}
											onChange={() => onTechStackChange(tech)}
											className="rounded border-zinc-600 bg-zinc-800 text-blue-500 
											cursor-pointer transition-colors hover:border-zinc-500 
											focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 
											focus:ring-offset-transparent"
										/>
										<span className="text-sm text-zinc-300">{tech}</span>
									</label>
								))}
							</div>
						</Disclosure.Panel>
					</div>
				)}
			</Disclosure>
		</div>
	);
}