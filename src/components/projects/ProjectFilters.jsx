import { StarBorder } from "@/components/reactbits";

const ProjectFilters = ({ filters = [], activeFilter, onFilterChange, counts = {} }) => {
  return (
    <div
      className="flex flex-wrap gap-2 sm:gap-3"
      role="group"
      aria-label="Filter projects"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const count = counts[filter] ?? 0;

        return (
          <StarBorder
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter)}
            className={[
              "poppins-semibold rounded-full text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 sm:text-[11px]",
              isActive
                ? "text-white shadow-[0_0_18px_rgba(0,255,94,0.18)]"
                : "text-[#9fffbf] hover:text-white",
            ].join(" ")}
            contentClassName="min-h-10 px-4 py-2 sm:px-5"
          >
            {filter} ({count})
          </StarBorder>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
