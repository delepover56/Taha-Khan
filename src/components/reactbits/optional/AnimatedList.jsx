import { motion, useReducedMotion } from "motion/react";

const AnimatedList = ({ items = [], renderItem, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
          },
        },
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id ?? item.title ?? item.label}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;
