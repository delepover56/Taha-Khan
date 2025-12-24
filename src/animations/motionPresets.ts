import type { Transition, Variants } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export const transitionFast: Transition = { duration: 0.2, ease };
export const transitionNormal: Transition = { duration: 0.4, ease };
export const transitionSlow: Transition = { duration: 0.55, ease };

const distance = 22;
const exitDistance = 10;

export const fadeIn = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
  exit: {
    opacity: 0,
    transition: transitionFast,
  },
});

export const fadeUp = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : distance },
  show: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: reducedMotion ? 0 : exitDistance,
    transition: transitionFast,
  },
});

export const fadeDown = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : -distance },
  show: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: reducedMotion ? 0 : -exitDistance,
    transition: transitionFast,
  },
});

export const slideLeft = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : distance },
  show: { opacity: 1, x: 0, transition },
  exit: {
    opacity: 0,
    x: reducedMotion ? 0 : distance,
    transition: transitionFast,
  },
});

export const slideRight = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : -distance },
  show: { opacity: 1, x: 0, transition },
  exit: {
    opacity: 0,
    x: reducedMotion ? 0 : -distance,
    transition: transitionFast,
  },
});

export const scaleIn = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.98 },
  show: { opacity: 1, scale: 1, transition },
  exit: {
    opacity: 0,
    scale: reducedMotion ? 1 : 0.99,
    transition: transitionFast,
  },
});

export const staggerContainer = (
  reducedMotion = false,
  delayChildren = 0.05,
  staggerChildren = 0.08
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reducedMotion ? 0 : staggerChildren,
      delayChildren: reducedMotion ? 0 : delayChildren,
    },
  },
});

export const staggerItem = (
  reducedMotion = false,
  transition: Transition = transitionNormal
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
  show: { opacity: 1, y: 0, transition },
});

export const hoverGlow = (reducedMotion = false) =>
  reducedMotion
    ? {}
    : {
        scale: 1.02,
        boxShadow: "0 0 20px rgba(0, 255, 94, 0.35)",
        transition: transitionFast,
      };

export const viewportOnce = { once: true, amount: 0.2 };
