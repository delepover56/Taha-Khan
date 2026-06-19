import { motion, useReducedMotion } from "motion/react";

const BlurText = ({ children, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default BlurText;
