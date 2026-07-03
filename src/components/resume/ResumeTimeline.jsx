import { AnimatedList, SpotlightCard } from "@/components/reactbits";

const ResumeTimeline = ({ eyebrow, title, summary, items = [] }) => {
  return (
    <section className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
            {eyebrow}
          </p>
          <h2 className="merienda type-h2 mt-2 text-white">{title}</h2>
          <span className="mt-3 block h-[2px] w-16 rounded-full bg-[#00ff5e55]" />
        </div>
        {summary && (
          <p className="poppins type-body-sm max-w-xl text-[#9fffbf]">
            {summary}
          </p>
        )}
      </div>

      <AnimatedList
        items={items}
        className="mt-6 flex flex-col gap-4 sm:mt-8"
        renderItem={(item) => (
          <SpotlightCard className="p-5 xs:p-6">
            <article className="relative pl-6">
              <span className="absolute left-0 top-1 h-3 w-3 rounded-full bg-[#00ff5e] shadow-[0_0_10px_rgba(0,255,94,0.6)]" />
              <span className="absolute bottom-0 left-[5px] top-6 w-px bg-[#00ff5e22]" />
              <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                {item.period}
              </p>
              <h3 className="roboto-slab type-h4 mt-3 text-white">
                {item.title}
              </h3>
              <p className="poppins type-body-sm mt-2 text-[#c7ffd8]">
                {item.place}
              </p>
              {item.note && (
                <p className="poppins type-body-sm mt-3 leading-relaxed text-[#9fffbf]">
                  {item.note}
                </p>
              )}
            </article>
          </SpotlightCard>
        )}
      />
    </section>
  );
};

export default ResumeTimeline;
