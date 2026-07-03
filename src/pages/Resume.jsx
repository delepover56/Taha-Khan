import React, { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import ResumeDownloadCard from "@/components/resume/ResumeDownloadCard";
import ResumeSkillGroup from "@/components/resume/ResumeSkillGroup";
import ResumeTimeline from "@/components/resume/ResumeTimeline";
import { SpotlightCard } from "@/components/reactbits";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";
import resumeData from "@/data/resumeData.json";
import { useAppLoader } from "@/context/loaderContext";

const Resume = () => {
  const { markRouteReady } = useAppLoader();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  useEffect(() => {
    markRouteReady();
  }, [markRouteReady]);

  return (
    <motion.section
      variants={containerVariants}
      initial={initialState}
      whileInView="show"
      viewport={viewportOnce}
      className="flex w-full flex-col gap-7 sm:gap-9"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {resumeData.intro.eyebrow}
            </p>
            <motion.h1
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h1 mt-2 text-white"
            >
              {resumeData.intro.title}
            </motion.h1>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-20 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.intro.tags.map((item) => (
              <span
                key={item}
                className="poppins rounded-full border border-[#00ff5e26] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-[#9fffbf] xxs:text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="poppins type-body mt-5 max-w-5xl leading-relaxed text-[#c7ffd8] xs:mt-6">
          {resumeData.intro.summary}
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ResumeTimeline
          eyebrow={resumeData.experience.eyebrow}
          title={resumeData.experience.title}
          summary={resumeData.experience.summary}
          items={resumeData.experience.items}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ResumeTimeline
          eyebrow={resumeData.education.eyebrow}
          title={resumeData.education.title}
          summary={resumeData.education.summary}
          items={resumeData.education.items}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {resumeData.skills.eyebrow}
            </p>
            <motion.h2
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h2 mt-2 text-white"
            >
              {resumeData.skills.title}
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {resumeData.skills.summary}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-6 flex flex-wrap gap-4"
        >
          {resumeData.skills.groups.map((group) => (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className="min-w-0 basis-full shrink-0 md:basis-[calc(50%_-_0.5rem)] xl:basis-[calc(33.333333%_-_0.666667rem)]"
            >
              <ResumeSkillGroup {...group} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {resumeData.learning.eyebrow}
            </p>
            <motion.h2
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h2 mt-2 text-white"
            >
              {resumeData.learning.title}
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {resumeData.learning.summary}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-6 flex flex-wrap gap-4"
        >
          {resumeData.learning.items.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="min-w-0 basis-full shrink-0 md:basis-[calc(33.333333%_-_0.666667rem)]"
            >
              <SpotlightCard className="h-full p-5 xs:p-6">
                <article>
                  <h3 className="roboto-slab type-h4 text-white">
                    {item.title}
                  </h3>
                  <p className="poppins type-body-sm mt-3 leading-relaxed text-[#c7ffd8]">
                    {item.text}
                  </p>
                </article>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ResumeDownloadCard data={resumeData.download} />
      </motion.div>
    </motion.section>
  );
};

export default Resume;
