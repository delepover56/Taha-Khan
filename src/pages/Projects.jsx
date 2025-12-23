import React from "react";
import Slider from "@/components/Swiper";

const Projects = () => {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              Portfolio
            </p>
            <h1 className="merienda mt-2 text-3xl text-white lg:text-4xl">
              Featured work
            </h1>
          </div>
          <div className="rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-sm text-[#9fffbf]">
            Focused on UI, responsiveness, and motion.
          </div>
        </div>
        <p className="poppins mt-6 text-sm leading-relaxed text-[#c7ffd8] sm:text-base">
          I build dynamic, responsive, and visually engaging websites using{" "}
          <span className="text-[#00ff5e]">HTML</span>,{" "}
          <span className="text-[#00ff5e]">CSS</span>, and{" "}
          <span className="text-[#00ff5e]">JavaScript</span>, with{" "}
          <span className="text-[#00ff5e]">React.js</span> guiding my current
          learning path. Next on the roadmap is{" "}
          <span className="text-[#00ff5e]">Next.js</span> for more advanced
          production workflows.
        </p>
      </div>

      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="merienda text-3xl text-white">Project gallery</h2>
          <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
            Swipe to explore
          </p>
        </div>
        <div className="mt-6 w-full max-w-full overflow-hidden">
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Projects;
