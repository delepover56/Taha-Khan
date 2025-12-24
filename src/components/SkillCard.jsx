import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const widthClassMap = {
  40: "w-[40%]",
  85: "w-[85%]",
};

const SkillCard = ({ title, percentage }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const widthClass = widthClassMap[percentage] || "w-0";
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
        if (entry.isIntersecting && count === 0) {
          if (shouldReduceMotion) {
            setCount(percentage);
            return;
          }
          let start = 0;
          const duration = 1500;
          const fps = 30;
          const increment = percentage / (duration / fps);

          const interval = setInterval(() => {
            start += increment;
            if (start >= percentage) {
              setCount(percentage);
              clearInterval(interval);
            } else {
              setCount(Math.ceil(start));
            }
          }, 1000 / fps);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [count, isVisible, percentage, shouldReduceMotion]);

  return (
    <div
      ref={cardRef}
      className="group flex w-full flex-col gap-4 rounded-2xl border border-[#00ff5e22] bg-[#0b140d] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e0a]"
    >
      <div className="flex items-center justify-between">
        <h3 className="roboto-slab type-h4 text-white">
          {title}
        </h3>
        <span className="rounded-full border border-[#00ff5e33] bg-[#06180f] px-3 py-1 text-[11px] text-[#9fffbf] xs:text-xs">
          {count}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#06180f]">
        <div
          className={[
            "h-full rounded-full bg-[linear-gradient(90deg,#00ff5e_0%,#009b39_100%)] shadow-[0_0_10px_rgba(0,255,94,0.35)] transition-all duration-700",
            isVisible ? widthClass : "w-0",
          ].join(" ")}
        />
      </div>
    </div>
  );
};

export default SkillCard;
