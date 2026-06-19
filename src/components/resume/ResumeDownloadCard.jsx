import { SpotlightCard, StarBorder } from "@/components/reactbits";

const ResumeDownloadCard = ({ data }) => {
  return (
    <SpotlightCard className="border-[#00ff5e3a] bg-[#07140c] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.5)] xs:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
            {data.eyebrow}
          </p>
          <h2 className="merienda type-h2 mt-2 text-white">
            {data.title}
          </h2>
          <p className="poppins type-body-sm mt-3 max-w-2xl leading-relaxed text-[#c7ffd8]">
            {data.text}
          </p>
        </div>
        <StarBorder
          href={data.href}
          download
          className="poppins-semibold type-button w-full justify-center uppercase tracking-[0.26em] shadow-[0_0_22px_rgba(0,255,94,0.16)] sm:w-fit"
        >
          {data.label}
        </StarBorder>
      </div>
    </SpotlightCard>
  );
};

export default ResumeDownloadCard;
