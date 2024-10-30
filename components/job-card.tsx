"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import Image from 'next/image';

interface JobDetailCardProps {
  image: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  methodologies: string[];
  responsibilities: string[];
  technologies: string[];
  description: string;
}

export default function JobDetailCard({
  image,
  companyName,
  position,
  startDate,
  endDate,
  methodologies,
  responsibilities,
  technologies,
  description,
}: JobDetailCardProps) {
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
    <div
      onMouseMove={onMouseMove}
      className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>

      <div className="relative z-20 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={image}
                alt={`${companyName} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-medium text-zinc-200 group-hover:text-white">
                {companyName}
              </h3>
              <h4 className="text-lg text-zinc-400 group-hover:text-zinc-300">
                {position}
              </h4>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400">
                {startDate} - {endDate}
              </p>
            </div>
          </div>

          {/* Methodologies */}
          <div>
            <h5 className="mb-3 text-lg font-medium text-zinc-200 group-hover:text-white">
              Development Methodologies
            </h5>
            <div className="flex flex-wrap gap-2">
              {methodologies?.map((methodology, index) => (
                <span
                  key={index}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400 group-hover:text-zinc-300"
                >
                  {methodology}
                </span>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <h5 className="mb-3 text-lg font-medium text-zinc-200 group-hover:text-white">
              Key Responsibilities
            </h5>
            <div className="flex flex-wrap gap-2">
              {responsibilities?.map((responsibility, index) => (
                <span
                  key={index}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400 group-hover:text-zinc-300"
                >
                  {responsibility}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h5 className="mb-3 text-lg font-medium text-zinc-200 group-hover:text-white">
              Tech Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {technologies?.map((technology, index) => (
                <span
                  key={index}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400 group-hover:text-zinc-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h5 className="mb-3 text-lg font-medium text-zinc-200 group-hover:text-white">
              Brief History
            </h5>
            <p className="text-zinc-400 group-hover:text-zinc-300">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
