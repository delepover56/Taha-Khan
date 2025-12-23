import React from "react";

const About = () => {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              About
            </p>
            <h1 className="merienda mt-3 text-3xl text-white lg:text-4xl">
              Get to know me
            </h1>
            <p className="poppins mt-6 text-sm leading-relaxed text-[#c7ffd8] sm:text-base">
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
                className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e0f]"
              >
                <p className="poppins text-[10px] uppercase tracking-[0.32em] text-[#7feaa0]">
                  {item.title}
                </p>
                <p className="poppins mt-2 text-sm text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              Services
            </p>
            <h2 className="merienda mt-2 text-3xl text-white">What I do</h2>
          </div>
          <p className="poppins text-sm text-[#9fffbf]">
            Clean UI, bold interactions, and polished delivery.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Web Development",
              text: "Crafting sleek, responsive websites with modern tools.",
              icon: (
                <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path>
              ),
            },
            {
              title: "Discord Bots",
              text: "Custom automations and community tools with Discord.js.",
              icon: (
                <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
              ),
            },
            {
              title: "Image Editing",
              text: "Occasional visual polish for marketing assets and UI.",
              icon: (
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
              ),
            },
            {
              title: "Gaming Culture",
              text: "I stay inspired by games, mechanics, and visual systems.",
              icon: (
                <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"></path>
              ),
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group flex flex-col gap-4 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-5 transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e0f] hover:shadow-[0_0_18px_rgba(0,255,94,0.2)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00ff5e33] bg-[#06180f] transition-all duration-300 group-hover:bg-[#00ff5e]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#00ff5e"
                  className="transition-all duration-300 group-hover:fill-[#06210f]"
                >
                  {card.icon}
                </svg>
              </div>
              <h3 className="roboto-slab text-lg text-white">{card.title}</h3>
              <p className="poppins text-sm text-[#c7ffd8]">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
