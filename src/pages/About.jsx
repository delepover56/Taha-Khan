import React from "react";

const About = () => {
  return (
    <section className="flex w-full flex-col gap-8 sm:gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8">
        <div className="grid gap-6 md:gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              About
            </p>
            <h1 className="merienda type-h1 mt-3 text-white">
              Get to know me
            </h1>
            <p className="poppins type-body mt-5 leading-relaxed text-[#c7ffd8] xs:mt-6">
              Hey there! I am{" "}
              <span className="text-[#00ff5e]">M. Taha Khan</span> - a front-end
              developer from Karachi. I craft immersive, responsive interfaces
              with clean HTML, modern CSS, and thoughtful JavaScript.
              <br />
              <br />
              I have hands-on experience with{" "}
              <span className="text-[#00ff5e]">WordPress</span> and{" "}
              <span className="text-[#00ff5e]">PHP</span>, and I am leveling up
              fast in <span className="text-[#00ff5e]">React.js</span> with{" "}
              <span className="text-[#00ff5e]">Next.js</span> on deck.
              <br />
              <br />
              I also explore{" "}
              <span className="text-[#00ff5e]">Discord bot development</span>{" "}
              using <span className="text-[#00ff5e]">Discord.js</span> to build
              interactive tools for communities.
            </p>
          </div>
          <div className="grid gap-4">
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
              <div
                key={item.title}
                className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e0f] xs:p-5"
              >
                <p className="poppins type-caption uppercase tracking-[0.32em] text-[#7feaa0]">
                  {item.title}
                </p>
                <p className="poppins type-body-sm mt-2 text-white">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Services
            </p>
            <h2 className="merienda type-h2 mt-2 text-white">
              What I do
            </h2>
          </div>
          <p className="poppins type-body-sm text-[#9fffbf]">
            Clean UI, bold interactions, and polished delivery.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-stretch gap-4 sm:gap-5 sm:mt-8">
          {[
            {
              title: "Web Development",
              text: "Crafting sleek, responsive websites with modern tools.",
              iconViewBox: "0 0 24 24",
              iconSizeClass: "h-[22px] w-[22px]",
              icon: (
                <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path>
              ),
            },
            {
              title: "Discord Bots",
              text: "Custom automations and community tools with Discord.js.",
              iconViewBox: "0 0 24 24",
              iconSizeClass: "h-[21px] w-[21px]",
              icon: (
                <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
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
            <div
              key={card.title}
              className="group flex h-full flex-none flex-col gap-4 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e0f] hover:shadow-[0_0_18px_rgba(0,255,94,0.2)] xs:p-5 basis-full md:basis-[calc(50%-10px)] xl:basis-[calc(50%-10px)] [@media(min-width:1920px)]:basis-[calc(33.333%-13.5px)] 2xl:basis-[calc(25%-15px)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00ff5e33] bg-[#06180f] transition-all duration-300 group-hover:bg-[#00ff5e] xs:h-12 xs:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={card.iconViewBox}
                  fill="#00ff5e"
                  className={`transition-all duration-300 group-hover:fill-[#06210f] ${card.iconSizeClass}`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
