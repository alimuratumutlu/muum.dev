import Image from "next/image";
import JobDetailCard from "../../components/job-card";
import { Navigation } from "../../components/nav";
import Experiences from "../../data/experiences";

export const revalidate = 60;

export default async function AboutPage() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="container py-6 mx-auto space-y-12 md:space-y-16 md:pt-24 lg:pt-32">
				{/* Introduction Section */}
				<div className="max-w-3xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						About Muum Dev.
					</h2>
					<p className="mt-4 text-zinc-400">
						Building innovative solutions at the intersection of AI and web development.
					</p>
				</div>

				{/* Profile Section */}
				<div className="flex flex-col md:flex-row gap-8 items-start">
					<Image
						src="/ali-murat-umutlu.png"
						alt="Ali Murat Umutlu"
						width={300}
						height={300}
						className="rounded-lg object-cover"
					/>
					<div className="space-y-4">
						<p className="text-zinc-400">
							I am Murat Umutlu, a Lead Full Stack Developer with over 10 years of experience
							in building innovative web solutions. My expertise spans across React, Next.js,
							TypeScript, Redux, Node.js, and AWS, enabling me to deliver robust and scalable
							applications that drive business growth.
						</p>
						<p className="text-zinc-400">
							Having experienced the unique challenges startups face in building their technical teams,
							I've made it my mission to bridge the gap between startups and talented developers.
							Through my YouTube channel and professional network, I help connect startups with
							skilled, enthusiastic developers who understand the fast-paced startup environment.
						</p>
						<p className="text-zinc-400">
							I create educational content and share insights about modern web development,
							helping to nurture a community of agile and forward-thinking developers.
							My network includes professionals who not only possess technical expertise but
							also understand the unique requirements and challenges of startup environments.
						</p>
						<p className="text-zinc-400">
							I am currently open to Co-Founder opportunities, where I can leverage
							both my technical expertise and my network to help startups build strong
							technical teams. I'm passionate about working with startups and am willing to
							contribute my expertise until investment is secured, ensuring they have the
							right technical foundation for success.
						</p>
					</div>
				</div>


				{/* Professional Experience Section */}
				<div className="mx-auto">
					<h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-8">
						Professional Experience
					</h2>
					<div className="space-y-8">
						{Experiences.map((experience, index) => (
							<JobDetailCard key={index} {...experience} />
						))}
					</div>
				</div>

				{/* Contact/Collaboration Section */}
				<div className="mx-auto text-center">
					<p className="text-zinc-400">
						If you are looking for a committed and experienced leader who can
						transform your ideas into reality, I would love to connect and discuss
						how I can contribute to your startup's success.
					</p>
				</div>
			</div>
		</div>
	);
}
