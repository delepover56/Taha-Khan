import { memo } from "react";

const Preloader = ({ isActive, onExited }) => {
  const handleTransitionEnd = () => {
    if (!isActive && onExited) {
      onExited();
    }
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[60] flex items-center justify-center bg-[#050a08]",
        "transition-opacity duration-700",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,94,0.16),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,_black_0%,_transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0_49%,_rgba(0,255,94,0.12)_50%,_transparent_51%),_linear-gradient(90deg,transparent_0_49%,_rgba(0,255,94,0.12)_50%,_transparent_51%)] bg-[length:80px_80px] animate-[gridShift_40s_linear_infinite]" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl shadow-[0_0_30px_rgba(0,255,94,0.35)]">
          <img src="./favicon.png" alt="Logo" className="h-full w-full" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="poppins type-caption uppercase tracking-[0.4em] text-[#7feaa0]">
            Loading portfolio
          </p>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-[#00ff5e] shadow-[0_0_10px_rgba(0,255,94,0.7)] animate-[glowPulse_1.8s_ease-in-out_infinite]"
                style={{ animationDelay: `${dot * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Preloader);
