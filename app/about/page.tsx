import { Navigation } from "../components/nav";

export const revalidate = 60;
export default async function AboutPage() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="container py-6 mx-auto md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-3xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						About Muum Dev.
					</h2>
					<p className="mt-4 text-zinc-400">
						Here you can find a brief overview of my professional background and
						how I can help you.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />


				<div className="flex flex-col md:flex-row gap-8 items-start">
					<img
						src="/ali-murat-umutlu.png"
						alt="Ali Murat Umutlu"
						className="w-64 h-64 rounded-lg object-cover"
					/>
					<div className="space-y-4">
						<p className="text-zinc-400 text-justify">
						I am Murat Umutlu, an accomplished Full Stack Developer with over 10
					years of experience in creating innovative, high-performing web
					solutions. With deep expertise in technologies like React, Next.js,
					TypeScript, Redux, Node.js, and AWS, I have successfully delivered
					scalable and user-centric applications that have been used by
					millions.
						</p>
						<p className="text-zinc-400 text-justify">
						Throughout my career, I have built and led teams, developed
					comprehensive web interfaces, and contributed to projects that have
					significantly improved user engagement and system efficiency. I am
					passionate about leveraging cutting-edge technologies to solve complex
					problems and deliver impactful solutions.
						</p>
						<p className="text-zinc-400 text-justify">
						I am currently open to exploring CTO and Co-Founder roles, where I can
					build and lead technical teams to drive innovation and growth. I am
					particularly interested in collaborating with startups and am willing
					to work without compensation until they secure investment, offering my
					expertise to help them achieve their vision.
						</p>
						<p className="text-zinc-400 text-justify">
						If you are looking for a committed and experienced leader who can
					transform your ideas into reality, I would love to connect and discuss
					how I can contribute to your startup's success.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
