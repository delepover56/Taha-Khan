"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

interface AtomProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  isHovered?: boolean;
  className?: string;
}

const centerDotVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.5, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const orbitVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const Atom = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  isHovered = false,
  className,
}: AtomProps) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 ${isHovered ? "stroke-[#ffffff]" : "stroke-[#009b39]"} ${className ?? ""}`}
      initial="normal"
      animate={isHovered ? "animate" : "normal"}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="1"
        variants={centerDotVariants}
      />
      <motion.g variants={orbitVariants}>
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
      </motion.g>
    </motion.svg>
  );
};

export { Atom };
