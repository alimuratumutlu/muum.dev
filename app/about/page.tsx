import { Navigation } from "../components/nav";

export const revalidate = 60;
export default async function AboutPage() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						About Muum Dev.
					</h2>
					<p className="mt-4 text-zinc-400">
						Some of the projects are from work and some are on my own time.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<p className=" text-zinc-400 text-justify">
					I am Murat Umutlu, an accomplished Full Stack Developer with over 10
					years of experience in creating innovative, high-performing web
					solutions. With deep expertise in technologies like React, Next.js,
					TypeScript, Redux, Node.js, and AWS, I have successfully delivered
					scalable and user-centric applications that have been used by
					millions.
				</p>
				<p className="mt-1 text-zinc-400 text-justify">
					Throughout my career, I have built and led teams, developed
					comprehensive web interfaces, and contributed to projects that have
					significantly improved user engagement and system efficiency. I am
					passionate about leveraging cutting-edge technologies to solve complex
					problems and deliver impactful solutions.
				</p>
				<p className="mt-2 text-zinc-400 text-justify">
					I am currently open to exploring CTO and Co-Founder roles, where I can
					build and lead technical teams to drive innovation and growth. I am
					particularly interested in collaborating with startups and am willing
					to work without compensation until they secure investment, offering my
					expertise to help them achieve their vision.
				</p>
				<p className="mt-2 text-zinc-400 text-justify">
					If you are looking for a committed and experienced leader who can
					transform your ideas into reality, I would love to connect and discuss
					how I can contribute to your startup's success.
				</p>
			</div>
		</div>
	);
}
