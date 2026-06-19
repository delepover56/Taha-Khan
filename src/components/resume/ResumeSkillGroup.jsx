import { SpotlightCard } from "@/components/reactbits";

const ResumeSkillGroup = ({ title, description, items = [] }) => {
  return (
    <SpotlightCard className="h-full p-5 xs:p-6">
      <article className="flex h-full flex-col">
        <h3 className="roboto-slab type-h4 text-white">{title}</h3>
        {description && (
          <p className="poppins type-body-sm mt-2 leading-relaxed text-[#c7ffd8]">
            {description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="poppins max-w-full rounded-full border border-[#00ff5e26] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#9fffbf] xxs:text-[10px]"
            >
              {item}
            </span>
          ))}
        </div>
      </article>
    </SpotlightCard>
  );
};

export default ResumeSkillGroup;
