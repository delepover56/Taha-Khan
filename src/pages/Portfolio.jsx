import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Slider from "@/components/Swiper";
import { useAppLoader } from "@/context/loaderContext";
import ProjectFilters from "@/components/projects/ProjectFilters";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";

const FILTERS = ["All", "Frontend", "React", "WordPress", "Shopify"];

const formatProjectCount = (count) =>
  `Showing ${count} ${count === 1 ? "Project" : "Projects"}`;

const galleryTransition = {
  duration: 0.38,
  ease: [0.16, 1, 0.3, 1],
};

const galleryExitTransition = {
  duration: 0.2,
  ease: [0.4, 0, 1, 1],
};

const Portfolio = () => {
  const { markRouteReady, projects, projectsStatus } = useAppLoader();
  const [activeFilter, setActiveFilter] = useState("All");
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";
  const galleryVariants = shouldReduceMotion
    ? {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.18 } },
      exit: { opacity: 0, transition: { duration: 0.12 } },
    }
    : {
      hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: galleryTransition,
      },
      exit: {
        opacity: 0,
        y: -12,
        scale: 0.985,
        filter: "blur(8px)",
        transition: galleryExitTransition,
      },
    };

  useEffect(() => {
    markRouteReady();
  }, [markRouteReady]);

  const filterCounts = useMemo(() => {
    return FILTERS.reduce((counts, filter) => {
      counts[filter] =
        filter === "All"
          ? projects.length
          : projects.filter((project) => project.filters?.includes(filter)).length;
      return counts;
    }, {});
  }, [projects]);

  const visibleFilters = useMemo(
    () => FILTERS.filter((filter) => filter === "All" || filterCounts[filter] > 0),
    [filterCounts]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.filters?.includes(activeFilter));
  }, [activeFilter, projects]);

  // const projectCountLabel = formatProjectCount(filteredProjects.length);

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
              Featured Projects
            </motion.h1>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          {/* <div
            className="poppins type-body-sm w-fit max-w-full rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[#9fffbf]"
            aria-live="polite"
          >
            {formatProjectCount(projects.length)}
          </div> */}
        </div>
        <p className="poppins type-body mt-5 leading-relaxed text-[#c7ffd8] xs:mt-6">
          Explore a selection of projects that reflect my experience building
          responsive websites, modern user interfaces, and e-commerce solutions.
          From <span className="text-[#00ff5e]">React</span> applications to
          <span className="text-[#00ff5e]"> WordPress</span>,
          <span className="text-[#00ff5e]"> WooCommerce</span>, and
          <span className="text-[#00ff5e]"> Shopify</span> websites, each project
          emphasizes clean code, responsive design, accessibility, performance,
          and technical SEO.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <motion.h2
                variants={fadeUp(shouldReduceMotion)}
                className="merienda type-h2 text-white"
              >
                Browse Projects
              </motion.h2>
              {/* <p
                className="poppins type-body-sm mt-2 text-[#9fffbf]"
                aria-live="polite"
              >
                {projectCountLabel}
              </p> */}
            </div>
            {/* <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Swipe or use keyboard to explore
            </p> */}
          </div>

          <ProjectFilters
            filters={visibleFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={filterCounts}
          />
        </div>

        <motion.div
          variants={fadeUp(shouldReduceMotion)}
          className="mt-6 w-full max-w-full overflow-hidden"
          role="region"
          aria-label="Project gallery"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeFilter}-${projectsStatus}`}
              variants={galleryVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="min-w-0"
            >
              {filteredProjects.length > 0 && (
                <Slider
                  projects={filteredProjects}
                  swiperKey={`${activeFilter}-${filteredProjects.length}`}
                />
              )}
              {filteredProjects.length === 0 && projectsStatus !== "error" && (
                <div className="rounded-2xl border border-[#00ff5e22] bg-[#06180f] p-5 text-[#c7ffd8] xs:p-6">
                  <p className="poppins-semibold type-body text-white">
                    No {activeFilter} projects are published yet.
                  </p>
                  <p className="poppins type-body-sm mt-2 text-[#9fffbf]">
                    More case studies are coming soon as the portfolio expands.
                  </p>
                </div>
              )}
              {projectsStatus === "error" && filteredProjects.length === 0 && (
                <p className="poppins type-body-sm text-[#ffb4b4]">
                  Projects are temporarily unavailable. Please check back soon.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Portfolio;
