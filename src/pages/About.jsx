import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  hoverGlow,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";

const About = () => {
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
        <div>
          <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
            About
          </p>
          <motion.h1 variants={fadeUp(shouldReduceMotion)} className="merienda type-h1 mt-3 text-white">
            Get to know me
          </motion.h1>
          <motion.span
            variants={fadeUp(shouldReduceMotion)}
            className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
          />
          <p className="poppins type-body mt-5 max-w-5xl leading-relaxed text-[#c7ffd8] xs:mt-6 2xl:max-w-6xl">
            Hey there! I am{" "}
            <span className="text-[#00ff5e]">M. Taha Khan</span> - a front-end
            developer from Karachi. I craft immersive, responsive interfaces
            with clean HTML, modern CSS, and thoughtful JavaScript.
            <br />
            <br />
            I have extensive experience delivering custom{" "}
            <span className="text-[#00ff5e]">WordPress</span> and{" "}
            <span className="text-[#00ff5e]">Shopify</span> solutions,
            specializing in performance optimization and pixel-perfect design.
            <br />
            <br />
            Currently, I am expanding my technical expertise in{" "}
            <span className="text-[#00ff5e]">React.js</span> and{" "}
            <span className="text-[#00ff5e]">Tailwind CSS</span> to build
            modern, scalable web applications that push the boundaries of the user experience.
          </p>

          <motion.div
            variants={containerVariants}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-5"
          >
            {[
              {
                title: "Focus",
                text: "UI engineering, component systems, and responsive layouts.",
              },
              {
                title: "Tooling",
                text: "React 19, Tailwind CSS, Vite, and modern JavaScript.",
              },
              {
                title: "Growth",
                text: "Building confidence through real-world portfolio work.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={hoverGlow(shouldReduceMotion)}
                className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] xs:p-5 2xl:p-6"
              >
                <p className="poppins type-caption uppercase tracking-[0.32em] text-[#7feaa0]">
                  {item.title}
                </p>
                <p className="poppins type-body-sm mt-2 text-white">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Services
            </p>
            <motion.h2 variants={fadeUp(shouldReduceMotion)} className="merienda type-h2 mt-2 text-white">
              What I do
            </motion.h2>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-14 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <p className="poppins type-body-sm text-[#9fffbf]">
            Clean UI, bold interactions, and polished delivery.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-6 flex flex-wrap items-stretch gap-4 sm:gap-5 sm:mt-8"
        >
          {[
            {
              title: "Web Development",
              text: "Building pixel-perfect, interactive front-ends with React.js, Tailwind CSS, and optimized JavaScript.",
              iconViewBox: "0 0 24 24",
              iconSizeClass: "h-[22px] w-[22px]",
              icon: (
                <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path>
              ),
            },
            {
              title: "CMS Management",
              text: "Expertise in building scalable sites using WordPress and Shopify with custom Liquid and Elementor logic.",
              iconViewBox: "0 0 24 24",
              iconSizeClass: "h-[21px] w-[21px]",
              icon: (
                <>
                  <path d="M22 7.999a1 1 0 0 0-.516-.874l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5A1 1 0 0 0 22 7.999zm-9.977 3.855L5.06 7.965l6.917-3.822 6.964 3.859-6.918 3.852z"></path>
                  <path d="M20.515 11.126 12 15.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z"></path>
                  <path d="M20.515 15.126 12 19.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z"></path>
                </>
              ),
            },
            {
              title: "Image Editing",
              text: "Occasional visual polish for marketing assets and UI.",
              iconViewBox: "0 0 24 24",
              iconSizeClass: "h-[20px] w-[20px]",
              icon: (
                <>
                  <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
                  <path d="m10 14-1-1-3 4h12l-5-7z"></path>
                </>
              ),
            },
            {
              title: "Gaming Culture",
              text: "I stay inspired by games, mechanics, and visual systems.",
              iconViewBox: "0 0 16 16",
              iconSizeClass: "h-5 w-5",
              icon: (
                <>
                  <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"></path>
                  <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27"></path>
                </>
              ),
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={hoverGlow(shouldReduceMotion)}
              className="group flex h-full flex-none flex-col gap-4 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] xs:p-5 basis-full md:basis-[calc(50%-10px)] xl:basis-[calc(50%-10px)] [@media(min-width:1920px)]:basis-[calc(33.333%-13.5px)] 2xl:basis-[calc(25%-15px)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00ff5e33] bg-[#06180f] transition-colors duration-200 group-hover:border-[#00ff5e88] group-hover:bg-[#00ff5e14] xs:h-12 xs:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={card.iconViewBox}
                  fill="#00ff5e"
                  className={`transition-colors duration-200 group-hover:fill-white ${card.iconSizeClass}`}
                >
                  {card.icon}
                </svg>
              </div>
              <h3 className="roboto-slab type-h4 text-white">
                {card.title}
              </h3>
              <p className="poppins type-body-sm text-[#c7ffd8]">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
