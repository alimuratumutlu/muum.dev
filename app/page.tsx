import Link from "next/link";
import { Navigation } from "./components/nav";
import Particles from "./components/particles";

export const revalidate = 60;

export default function LandingPage() {
	return (
		<div className="bg-zinc-900 text-white">
			<Navigation />

			<section className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
				<nav className="my-16 animate-fade-in">
					<ul className="flex items-center justify-center gap-4">
						{[
							{ name: "ai", href: "/network/muum-ai" },
							{ name: "app", href: "/network/muum-app" },
							{ name: "digital", href: "/network/muum-digital" },
							{ name: "games", href: "/network/muum-games" },
							{ name: "network", href: "/network/muum-network" },
							{ name: "tech", href: "/network/muum-tech" },
						].map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
							>
								{item.name}
							</Link>
						))}
					</ul>
				</nav>
				<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
				<Particles
					className="absolute inset-0 -z-10 animate-fade-in"
					quantity={100}
				/>
				<h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
					{process.env.NEXT_PUBLIC_SITE_NAME}
				</h1>
				<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
				<div className="my-16 text-center animate-fade-in">
					<h2 className="text-sm text-zinc-500 ">
						360 degree{" "}
						<Link
							href="/network"
							className="underline duration-500 hover:text-zinc-300"
						>
							AI solutions
						</Link>{" "}
						to make the world a better place
					</h2>
				</div>
			</section>
		</div>
	);
}
