import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/animations/motionPresets";
import {
  BlurText,
  GradientText,
  MagicBento,
  SpotlightCard,
  StarBorder,
} from "@/components/reactbits";
import AboutFocusCard from "@/components/about/AboutFocusCard";
import aboutData from "@/data/aboutData.json";
import { useAppLoader } from "@/context/loaderContext";

const renderSegments = (segments) =>
  segments.map((segment, index) =>
    segment.highlight ? (
      <GradientText key={`${segment.text}-${index}`}>{segment.text}</GradientText>
    ) : (
      <React.Fragment key={`${segment.text}-${index}`}>
        {segment.text}
      </React.Fragment>
    )
  );

const About = () => {
  const navigate = useNavigate();
  const { markRouteReady } = useAppLoader();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";
  const handleProjectsClick = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    navigate(aboutData.hero.ctaPath);
  };

  useEffect(() => {
    markRouteReady();
  }, [markRouteReady]);

  return (
    <motion.section
      variants={containerVariants}
      initial={initialState}
      animate="show"
      className="flex w-full flex-col gap-8 sm:gap-10"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-[1.75rem] border border-[#00ff5e2a] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_18px_42px_rgba(0,0,0,0.5)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div>
          <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
            {aboutData.hero.eyebrow}
          </p>
          <motion.h1
            variants={fadeUp(shouldReduceMotion)}
            className="merienda mt-3 max-w-4xl text-[2rem] leading-tight text-white xs:text-[2.35rem] sm:text-5xl lg:text-[3.25rem] xl:text-[4rem]"
          >
            <BlurText>
              {aboutData.hero.namePrefix}
              <GradientText>{aboutData.hero.name}</GradientText>
            </BlurText>
          </motion.h1>
          <motion.span
            variants={fadeUp(shouldReduceMotion)}
            className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
          />
          <div className="mt-5 max-w-5xl xs:mt-6 2xl:max-w-6xl">
            {aboutData.hero.introParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={[
                  "poppins type-body leading-relaxed text-[#c7ffd8]",
                  index > 0 ? "mt-4" : "",
                ].join(" ")}
              >
                {renderSegments(paragraph)}
              </p>
            ))}
          </div>

          <motion.div
            variants={fadeUp(shouldReduceMotion)}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <StarBorder
              type="button"
              onClick={handleProjectsClick}
              className="poppins-semibold type-button uppercase tracking-[0.26em] transition-colors duration-200 hover:text-white"
            >
              {aboutData.hero.ctaLabel}
            </StarBorder>
            <p className="poppins type-caption max-w-[260px] uppercase tracking-[0.28em] text-[#7feaa0]">
              {aboutData.hero.stackSummary}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            role="list"
          >
            {aboutData.heroFocusCards.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                role="listitem"
              >
                <AboutFocusCard {...item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#08120ccf] p-5 backdrop-blur-xl shadow-[0_18px_38px_rgba(0,0,0,0.46)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {aboutData.buildSection.eyebrow}
            </p>
            <motion.h2 variants={fadeUp(shouldReduceMotion)} className="merienda type-h2 mt-2 text-white">
              {aboutData.buildSection.title}
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-14 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {aboutData.buildSection.summary}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-6 grid min-w-0 gap-4 sm:mt-8 md:grid-cols-2 2xl:grid-cols-4"
          role="list"
        >
          {aboutData.buildSection.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="min-w-0"
            >
              <SpotlightCard
                role="listitem"
                className="h-full min-w-0 p-5 xs:p-6"
                spotlightColor="rgba(0, 255, 94, 0.18)"
              >
                <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                  {card.label}
                </p>
                <h3 className="roboto-slab type-h4 mt-4 text-white">
                  {card.title}
                </h3>
                <p className="poppins type-body-sm mt-3 text-[#c7ffd8]">
                  {card.text}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e2a] bg-[#09130dcc] p-5 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.48)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {aboutData.stackSection.eyebrow}
            </p>
            <motion.h2
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h2 mt-2 text-white"
            >
              {aboutData.stackSection.title}
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-14 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {aboutData.stackSection.summary}
          </p>
        </div>

        <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
          <MagicBento
            staticMode={shouldReduceMotion}
            glowColor="0, 255, 94"
            items={aboutData.stackSection.skillGroups.map((group) => ({
              ...group,
              children: (
                <div className="mt-4 flex min-w-0 flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="poppins max-w-full rounded-full border border-[#00ff5e26] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#9fffbf] xxs:text-[10px] sm:tracking-[0.24em]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ),
            }))}
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {aboutData.growthSection.eyebrow}
            </p>
            <motion.h2
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h2 mt-2 text-white"
            >
              {aboutData.growthSection.title}
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-14 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {aboutData.growthSection.summary}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-6 grid gap-4 md:grid-cols-3"
        >
          {aboutData.growthSection.items.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <article className="h-full rounded-2xl border border-[#00ff5e20] bg-[#0b140d] p-5 shadow-[0_12px_26px_rgba(0,0,0,0.28)] xs:p-6">
                <h3 className="roboto-slab type-h4 text-white">
                  {item.title}
                </h3>
                <p className="poppins type-body-sm mt-3 leading-relaxed text-[#c7ffd8]">
                  {item.text}
                </p>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
