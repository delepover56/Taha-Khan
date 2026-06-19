const AboutFocusCard = ({ title, description }) => {
  return (
    <article className="group relative h-full min-w-0 overflow-hidden rounded-2xl border border-[#00ff5e24] bg-[#08140d] p-4 shadow-[0_12px_26px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-[#00ff5e66] hover:bg-[#00ff5e0d] xs:p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-[#00ff5e88] to-transparent opacity-60"
      />
      <p className="poppins type-caption uppercase tracking-[0.28em] text-[#7feaa0]">
        Focus
      </p>
      <h3 className="roboto-slab type-h4 mt-3 text-white">{title}</h3>
      <p className="poppins type-body-sm mt-2 leading-relaxed text-[#c7ffd8]">
        {description}
      </p>
    </article>
  );
};

export default AboutFocusCard;
