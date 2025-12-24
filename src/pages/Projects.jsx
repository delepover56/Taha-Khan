import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Slider from "@/components/Swiper";
import { useAppLoader } from "@/context/AppLoaderContext";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";

const Projects = () => {
  const { projects, projectsStatus } = useAppLoader();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  return (
    <motion.section
      variants={containerVariants}
      initial={initialState}
      whileInView="show"
      viewport={viewportOnce}
      className="flex w-full flex-col gap-8 sm:gap-10"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Portfolio
            </p>
            <motion.h1 variants={fadeUp(shouldReduceMotion)} className="merienda type-h1 mt-2 text-white">
              Featured work
            </motion.h1>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <div className="poppins type-body-sm rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[#9fffbf]">
            Focused on UI, responsiveness, and motion.
          </div>
        </div>
        <p className="poppins type-body mt-5 leading-relaxed text-[#c7ffd8] xs:mt-6">
          I build dynamic, responsive, and visually engaging websites using{" "}
          <span className="text-[#00ff5e]">HTML</span>,{" "}
          <span className="text-[#00ff5e]">CSS</span>, and{" "}
          <span className="text-[#00ff5e]">JavaScript</span>, with{" "}
          <span className="text-[#00ff5e]">React.js</span> guiding my current
          learning path. Next on the roadmap is{" "}
          <span className="text-[#00ff5e]">Next.js</span> for more advanced
          production workflows.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <motion.h2 variants={fadeUp(shouldReduceMotion)} className="merienda type-h2 text-white">
            Project gallery
          </motion.h2>
          <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
            Swipe to explore
          </p>
        </div>
        <motion.div variants={fadeUp(shouldReduceMotion)} className="mt-6 w-full max-w-full overflow-hidden">
          {projects.length > 0 && <Slider projects={projects} />}
          {projectsStatus === "error" && projects.length === 0 && (
            <p className="poppins type-body-sm text-[#ffb4b4]">
              Projects are temporarily unavailable. Please check back soon.
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Projects;
