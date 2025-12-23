import React from "react";
import SkillCard from "@/components/SkillCard";

const Resume = () => {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              Resume
            </p>
            <h1 className="merienda mt-2 text-3xl text-white lg:text-4xl">
              Experience and education
            </h1>
          </div>
          <p className="poppins text-sm text-[#9fffbf]">
            Building modern UI with consistent momentum.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00ff5e33] bg-[#06180f]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#00ff5e"
                >
                  <path d="M21 10h-2V4h1V2H4v2h1v6H3a1 1 0 0 0-1 1v9h20v-9a1 1 0 0 0-1-1zm-7 8v-4h-4v4H7V4h10v14h-3z"></path>
                  <path d="M9 6h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z"></path>
                </svg>
              </div>
              <h2 className="roboto-slab text-xl text-white">Education</h2>
            </div>
            <div className="space-y-6 border-l border-[#00ff5e1f] pl-5">
              {[
                {
                  period: "2023 - 2025",
                  title: "Diploma in Web Development",
                  place: "ApTech Metro, Star Gate",
                },
                {
                  period: "2025 - Present",
                  title: "Intermediate",
                  place: "ApTech Metro, Star Gate",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-[13px] top-1 h-3 w-3 rounded-full bg-[#00ff5e] shadow-[0_0_10px_rgba(0,255,94,0.6)]" />
                  <p className="poppins text-[10px] uppercase tracking-[0.3em] text-[#7feaa0]">
                    {item.period}
                  </p>
                  <h3 className="roboto-slab mt-2 text-base text-white">
                    {item.title}
                  </h3>
                  <p className="poppins text-sm text-[#c7ffd8]">
                    {item.place}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00ff5e33] bg-[#06180f]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#00ff5e"
                >
                  <path d="m20.895 7.553-2-4A1.001 1.001 0 0 0 18 3h-5c-.379 0-.725.214-.895.553L10.382 7H6c-.379 0-.725.214-.895.553l-2 4a1 1 0 0 0 0 .895l2 4c.17.338.516.552.895.552h4.382l1.724 3.447A.998.998 0 0 0 13 21h5c.379 0 .725-.214.895-.553l2-4a1 1 0 0 0 0-.895L19.118 12l1.776-3.553a1 1 0 0 0 .001-.894zM13.618 5h3.764l1.5 3-1.5 3h-3.764l-1.5-3 1.5-3zm-8.5 7 1.5-3h3.764l1.5 3-1.5 3H6.618l-1.5-3zm12.264 7h-3.764l-1.5-3 1.5-3h3.764l1.5 3-1.5 3z"></path>
                </svg>
              </div>
              <h2 className="roboto-slab text-xl text-white">Experience</h2>
            </div>
            <div className="space-y-6 border-l border-[#00ff5e1f] pl-5">
              {[
                {
                  period: "3 Years",
                  title: "Front-End Development",
                  place: "HTML, CSS, JavaScript, React, WordPress",
                },
                {
                  period: "1 Year",
                  title: "Back-End Development",
                  place: "PHP and MySQL",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-[13px] top-1 h-3 w-3 rounded-full bg-[#00ff5e] shadow-[0_0_10px_rgba(0,255,94,0.6)]" />
                  <p className="poppins text-[10px] uppercase tracking-[0.3em] text-[#7feaa0]">
                    {item.period}
                  </p>
                  <h3 className="roboto-slab mt-2 text-base text-white">
                    {item.title}
                  </h3>
                  <p className="poppins text-sm text-[#c7ffd8]">
                    {item.place}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              Skills
            </p>
            <h2 className="merienda mt-2 text-3xl text-white">
              Development strengths
            </h2>
          </div>
          <p className="poppins text-sm text-[#9fffbf]">
            Balancing quality and delivery.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <SkillCard title="Front-End Development" percentage={85} />
          <SkillCard title="Back-End Development" percentage={40} />
        </div>

        <div className="mt-10 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="roboto-slab text-xl text-white">Knowledge</h3>
            <p className="poppins text-[10px] uppercase tracking-[0.3em] text-[#7feaa0]">
              Toolset
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Tailwind",
              "Discord.js",
              "WordPress",
              "PHP",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#00ff5e26] bg-[#06180f] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#9fffbf] transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e12] hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
