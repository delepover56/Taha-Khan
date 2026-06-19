import { useCallback, useState } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 255, 94, 0.16)",
  ...props
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  return (
    <div
      {...props}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={[
        "relative overflow-hidden rounded-2xl border border-[#00ff5e22] bg-[#0b140d] transition-colors duration-200",
        "focus-within:border-[#00ff5e88]",
        className,
      ].join(" ")}
      style={{
        "--spotlight-x": `${position.x}px`,
        "--spotlight-y": `${position.y}px`,
        "--spotlight-opacity": isActive ? 1 : 0,
        "--spotlight-color": spotlightColor,
        ...props.style,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[var(--spotlight-opacity)] transition-opacity duration-300 motion-reduce:opacity-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 48%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
