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
	// Add helper functions to check if all items are selected
	const areAllPlatformsSelected = platforms.length === selectedPlatforms.length;
	const areAllTechStackSelected = techStack.length === selectedTechStack.length;

	// Add handlers for "All" options
	const handleAllPlatforms = () => {
		if (areAllPlatformsSelected) {
			// If all are selected, clear all
			platforms.forEach(platform => onPlatformChange(platform));
		} else {
			// If not all are selected, select all
			platforms.forEach(platform => {
				if (!selectedPlatforms.includes(platform)) {
					onPlatformChange(platform);
				}
			});
		}
	};

	const handleAllTechStack = () => {
		if (areAllTechStackSelected) {
			// If all are selected, clear all
			techStack.forEach(tech => onTechStackChange(tech));
		} else {
			// If not all are selected, select all
			techStack.forEach(tech => {
				if (!selectedTechStack.includes(tech)) {
					onTechStackChange(tech);
				}
			});
		}
	};

	return (
		<div className="space-y-4">
			<Disclosure defaultOpen>
				{({ open }) => (
					<div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition-colors hover:border-zinc-700">
						<Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-zinc-100">
							<span>Platforms</span>
							<ChevronDown
								className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-zinc-400`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className="mt-2">
							<div className="px-4 space-y-2 max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
								<label className="flex items-center space-x-2 cursor-pointer">
									<input
										type="checkbox"
										checked={areAllPlatformsSelected}
										onChange={handleAllPlatforms}
										className="rounded border-zinc-600 bg-zinc-800 text-blue-500 
										cursor-pointer transition-colors hover:border-zinc-500 
										focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 
										focus:ring-offset-transparent"
									/>
									<span className="text-sm text-zinc-300">All</span>
								</label>
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
						<Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-zinc-100">
							<span>Tech Stack</span>
							<ChevronDown
								className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-zinc-400`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className="mt-2">
							<div className="px-4 space-y-2 max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
								<label className="flex items-center space-x-2 cursor-pointer">
									<input
										type="checkbox"
										checked={areAllTechStackSelected}
										onChange={handleAllTechStack}
										className="rounded border-zinc-600 bg-zinc-800 text-blue-500 
										cursor-pointer transition-colors hover:border-zinc-500 
										focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 
										focus:ring-offset-transparent"
									/>
									<span className="text-sm text-zinc-300">All</span>
								</label>
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