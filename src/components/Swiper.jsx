import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { motion, useReducedMotion } from "motion/react";
import { hoverGlow, scaleIn } from "@/animations/motionPresets";


const Slider = ({ projects = [] }) => {
  const shouldReduceMotion = useReducedMotion();
  const cardVariants = scaleIn(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";
  const canLoop = projects.length > 1;
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    swiper.update();

    if (canLoop) {
      swiper.params.loop = true;
      swiper.loopCreate?.();
      swiper.autoplay?.start();
      return;
    }

    swiper.autoplay?.stop();
  }, [canLoop, projects.length]);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      spaceBetween={16}
      slidesPerView={1.05}
      grabCursor={true}
      modules={[Autoplay, Pagination]}
      pagination={true}
      loop={true}
      loopAdditionalSlides={projects.length}
      centeredSlides={false}
      observeParents={true}
      observer={true}
      watchSlidesProgress={true}
      autoplay={{
        delay: 2800,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        480: {
          slidesPerView: 1.12,
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
      className="select-none pb-10 sm:pb-12"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index} className="swiper-slide-card">
          <motion.div
            variants={cardVariants}
            initial={initialState}
            animate="show"
            whileHover={hoverGlow(shouldReduceMotion)}
            className="group flex h-[250px] w-full flex-col overflow-hidden rounded-2xl border border-[#00ff5e26] bg-[#0b140d] shadow-[0_16px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#00ff5e66] hover:shadow-[0_18px_36px_rgba(0,0,0,0.55)] xs:h-[260px] sm:h-[280px]"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-40 w-full overflow-hidden xs:h-[170px] sm:h-[180px]"
            >
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-90" />
            </a>
            <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
              <div className="flex flex-row justify-between items-center">
                <h3 className="merienda type-h4 text-white">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2">
                  {(project.tech ?? []).map((techIcon, techIndex) => (
                    <img
                      key={`${project.name}-tech-${techIndex}`}
                      src={techIcon}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  ))}
                </div>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="poppins-semibold type-button uppercase tracking-[0.28em] text-[#00ff5e] transition-all duration-300 hover:text-white"
              >
                View Live
              </a>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
