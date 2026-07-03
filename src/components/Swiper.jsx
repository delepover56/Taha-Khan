import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { motion, useReducedMotion } from "motion/react";
import { scaleIn } from "@/animations/motionPresets";
import ProjectCard from "@/components/projects/ProjectCard";


const Slider = ({ projects = [], swiperKey }) => {
  const shouldReduceMotion = useReducedMotion();
  const cardVariants = scaleIn(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";
  const canLoop = projects.length >= 3;

  if (projects.length === 0) return null;

  return (
    <Swiper
      key={swiperKey ?? projects.length}
      spaceBetween={16}
      slidesPerView={1.03}
      grabCursor={true}
      modules={[A11y, Autoplay, Keyboard, Pagination]}
      pagination={{
        clickable: true,
        bulletElement: "button",
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      a11y={{
        enabled: true,
        containerMessage: "Project gallery carousel",
        slideLabelMessage: "{{index}} of {{slidesLength}}",
        paginationBulletMessage: "Go to project slide {{index}}",
      }}
      loop={canLoop}
      centeredSlides={false}
      observeParents={true}
      observer={true}
      watchSlidesProgress={true}
      autoplay={
        shouldReduceMotion
          ? false
          : {
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
      }
      breakpoints={{
        480: {
          slidesPerView: 1.06,
          spaceBetween: 18,
        },
        640: {
          slidesPerView: 1.35,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      }}
      speed={900}
      className="select-none pb-12 sm:pb-14"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={`${project.name}-${index}`} className="swiper-slide-card">
          <motion.div
            variants={cardVariants}
            initial={initialState}
            animate="show"
            className="h-full w-full min-w-0"
          >
            <ProjectCard project={project} priority={index === 0} />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
