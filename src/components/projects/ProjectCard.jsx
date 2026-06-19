import { useReducedMotion } from "motion/react";
import { SpotlightCard } from "@/components/reactbits";

const STATUS_STYLES = {
  Live: "border-[#00ff5e55] bg-[#00ff5e14] text-[#c7ffd8]",
  "In Progress": "border-[#f6c85f66] bg-[#f6c85f14] text-[#ffe5a3]",
  "Case Study": "border-[#4fd1b866] bg-[#4fd1b814] text-[#b8fff1]",
};

const ProjectCard = ({ project }) => {
  const shouldReduceMotion = useReducedMotion();
  const statusClass =
    STATUS_STYLES[project.status] ?? "border-[#00ff5e44] bg-[#06180f] text-[#c7ffd8]";

  return (
    <SpotlightCard
      className="group flex h-full min-h-[500px] w-full min-w-0 flex-col p-0 shadow-[0_16px_30px_rgba(0,0,0,0.45)] sm:min-h-[520px] lg:min-h-[500px]"
      spotlightColor="rgba(0, 255, 94, 0.14)"
    >
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} live site`}
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-inset"
        >
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={[
              "h-full w-full object-cover",
              shouldReduceMotion
                ? ""
                : "transition-transform duration-500 group-hover:scale-[1.04]",
            ].join(" ")}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        </a>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4 xs:gap-4 xs:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={[
              "poppins-semibold inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.22em]",
              statusClass,
            ].join(" ")}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            {project.status}
          </span>
          <span className="poppins rounded-full border border-[#00ff5e24] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-[#7feaa0]">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="merienda type-h4 text-white">{project.name}</h3>
          <p className="poppins type-body-sm mt-2 leading-relaxed text-[#c7ffd8]">
            {project.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
            {(project.stack ?? []).map((item) => (
              <span
                key={item}
                className="poppins max-w-full rounded-full border border-[#00ff5e26] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#9fffbf] xxs:text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>

          {(project.tech ?? []).length > 0 && (
            <div className="mt-4 flex items-center gap-2" aria-hidden="true">
              {project.tech.map((techIcon, index) => (
                <img
                  key={`${project.name}-tech-${index}`}
                  src={techIcon}
                  alt=""
                  className="h-5 w-5 object-contain opacity-80"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3 pb-1">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} live site`}
                className="poppins-semibold inline-flex min-h-10 items-center justify-center rounded-full border border-[#00ff5e66] bg-[#00ff5e12] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#00ff5e] transition-colors duration-200 hover:border-[#00ff5e] hover:bg-[#00ff5e1f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
              >
                View Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} GitHub repository`}
                className="poppins-semibold inline-flex min-h-10 items-center justify-center rounded-full border border-[#00ff5e2a] bg-[#06180f] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9fffbf] transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
