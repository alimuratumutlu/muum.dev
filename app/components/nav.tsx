"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);

	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		// Function to handle click outside the modal
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		}

		// Add event listener for mousedown event
		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Cleanup event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<header id="header" ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500 border-zinc-800"
				}`}
			>
				<div className="container flex items-center justify-between px-4 py-6 mx-auto sm:px-0">
					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100 font-bold text-lg"
					>
						<Image
							src="/muum.png"
							alt="Muum Dev Logo"
							width={100}
							height={100}
						/>
					</Link>

					{/* Hamburger Menu Button */}
					<button
						className="block sm:hidden focus:outline-none"
						onClick={toggleMenu}
					>
						<MenuIcon size={24} />
					</button>

					{/* Desktop Links - Hidden on mobile */}
					<div className="hidden sm:flex gap-8">
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-xs sm:text-base"
						>
							Projects
						</Link>
						<Link
							href="/challenges"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-xs sm:text-base"
						>
							Challenges
						</Link>
						<Link
							href="/about"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-xs sm:text-base"
						>
							About
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-xs sm:text-base"
						>
							Contact
						</Link>
					</div>

					{/* Mobile Menu Modal */}
					{menuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-90"
						>
							<div
								ref={modalRef}
								onMouseMove={onMouseMove}
								className="relative p-6 bg-zinc-800 border border-zinc-600 rounded-lg overflow-hidden max-w-sm w-full mt-96 mx-10"
							>
								{/* Masked Gradient Effect */}
								<div className="pointer-events-none">
									<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
									<motion.div
										className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000"
										style={style}
									/>
									<motion.div
										className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
										style={style}
									/>
								</div>

								<nav className="flex flex-col items-center space-y-6">
									<Link
										href="/projects"
										className="text-lg text-zinc-300 hover:text-zinc-100"
										onClick={toggleMenu}
									>
										Projects
									</Link>
									<Link
										href="/challenges"
										className="text-lg text-zinc-300 hover:text-zinc-100"
										onClick={toggleMenu}
									>
										Challenges
									</Link>
									<Link
										href="/about"
										className="text-lg text-zinc-300 hover:text-zinc-100"
										onClick={toggleMenu}
									>
										About
									</Link>
									<Link
										href="/contact"
										className="text-lg text-zinc-300 hover:text-zinc-100"
										onClick={toggleMenu}
									>
										Contact
									</Link>
								</nav>

								<button
									onClick={toggleMenu}
									className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100"
								>
									<X size={24} />
								</button>
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</header>
	);
};
