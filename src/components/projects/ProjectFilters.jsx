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
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter)}
            className={[
              "poppins-semibold min-h-10 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em]",
              "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08] sm:px-5 sm:text-[11px]",
              isActive
                ? "border-[#00ff5e] bg-[#00ff5e16] text-white shadow-[0_0_18px_rgba(0,255,94,0.18)]"
                : "border-[#00ff5e2a] bg-[#06180f] text-[#9fffbf] hover:border-[#00ff5e88] hover:bg-[#00ff5e10] hover:text-white",
            ].join(" ")}
          >
            {filter} ({count})
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
