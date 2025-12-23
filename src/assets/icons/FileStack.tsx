"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

const pathVariants: Variants = {
  normal: {
    x: -4,
    y: 4,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  animate: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const bottomPathVariants: Variants = {
  normal: {
    x: 4,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  animate: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

interface FileStackProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  isHovered?: boolean;
  className?: string;
}

const FileStack = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  isHovered = false,
  className,
}: FileStackProps) => {
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
      <motion.g variants={pathVariants}>
        <path d="M21 7h-3a2 2 0 0 1-2-2V2" />
        <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" />
      </motion.g>
      <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
      <motion.path
        d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"
        variants={bottomPathVariants}
      />
    </motion.svg>
  );
};

export { FileStack };
