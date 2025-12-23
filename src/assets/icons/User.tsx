"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

const pathVariant: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const circleVariant: Variants = {
  normal: { pathLength: 1, pathOffset: 0, scale: 1 },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    scale: [0.5, 1],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

interface UserProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  isHovered?: boolean;
  className?: string;
}

const User = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  isHovered = false,
  className,
}: UserProps) => {
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
        cy="8"
        r="5"
        variants={circleVariant}
      />
      <motion.path
        d="M20 21a8 8 0 0 0-16 0"
        variants={pathVariant}
        transition={{ delay: 0.2, duration: 0.4 }}
      />
    </motion.svg>
  );
};

export { User };
