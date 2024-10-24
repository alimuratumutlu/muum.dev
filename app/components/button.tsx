"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

import React from "react";

interface ButtonProps {
	children: string;
	onClick?: () => void;
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
}: ButtonProps) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<button
			onMouseMove={onMouseMove}
			className={`overflow-hidden relative border rounded-lg hover:bg-blue-700 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 px-4 py-2  text-zinc-100 ${
				className && className
			} `}
			onClick={onClick}
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-10  bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-300 group-hover:opacity-50 "
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
					style={style}
				/>
			</div>

			{children}
		</button>
	);
};
