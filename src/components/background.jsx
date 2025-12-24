import React, { memo } from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050a08]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,94,0.16),_transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,_rgba(0,155,57,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(circle_at_center,_black_0%,_transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0_49%,_rgba(0,255,94,0.12)_50%,_transparent_51%),_linear-gradient(90deg,transparent_0_49%,_rgba(0,255,94,0.12)_50%,_transparent_51%)] bg-[length:70px_70px] animate-[gridShift_40s_linear_infinite]" />
      </div>
      <div className="absolute -top-36 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#00ff5e] opacity-16 blur-[120px] animate-[floatSlow_14s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-200px] left-[-140px] h-[320px] w-[320px] rounded-full bg-[#009b39] opacity-[0.18] blur-[140px] animate-[floatFast_11s_ease-in-out_infinite]" />
      <div className="absolute right-[-140px] top-[35%] h-[260px] w-[260px] rounded-full bg-[#00ff5e] opacity-14 blur-[120px] animate-[floatSlow_16s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
};

export default memo(Background);
