import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const CountUp = ({ value = 0, suffix = "", className = "" }) => {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const duration = 900;
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(value * progress));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion, value]);

  return (
    <span className={className}>
      {shouldReduceMotion ? value : count}
      {suffix}
    </span>
  );
};

export default CountUp;
