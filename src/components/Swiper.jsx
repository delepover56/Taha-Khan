import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Projects from "./MyProjects";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperCustom.css";

const Slider = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      grabCursor={true}
      modules={[Autoplay, Pagination]}
      pagination={true}
      loop={true}
      centeredSlides={false}
      autoplay={{
        delay: 3200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1400}
      className="select-none pb-12"
    >
      {Projects.map((project, index) => (
        <SwiperSlide key={index} className="swiper-slide-card">
          <div className="group flex h-[280px] w-full flex-col overflow-hidden rounded-2xl border border-[#00ff5e26] bg-[#0b140d] shadow-[0_16px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#00ff5e66] hover:shadow-[0_18px_36px_rgba(0,0,0,0.55)]">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-[180px] w-full overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />
            </a>
            <div className="flex flex-1 flex-col justify-between gap-3 p-4">
              <div>
                <p className="poppins text-[10px] uppercase tracking-[0.32em] text-[#7feaa0]">
                  Featured Project
                </p>
                <h3 className="merienda text-lg text-white">{project.name}</h3>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="poppins-semibold text-sm uppercase tracking-[0.28em] text-[#00ff5e] transition-all duration-300 hover:text-white"
              >
                View Live
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
