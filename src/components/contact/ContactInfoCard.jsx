import { SpotlightCard } from "@/components/reactbits";

const ContactInfoCard = ({
  eyebrow,
  title,
  text,
  href,
  linkLabel,
  external = false,
}) => {
  const content = (
    <>
      <p className="poppins type-caption uppercase tracking-[0.28em] text-[#7feaa0]">
        {eyebrow}
      </p>
      <h3 className="roboto-slab type-h4 mt-3 text-white">{title}</h3>
      {text && (
        <p className="poppins type-body-sm mt-2 leading-relaxed text-[#c7ffd8]">
          {text}
        </p>
      )}
      {linkLabel && (
        <span className="poppins mt-4 inline-flex w-fit rounded-full border border-[#00ff5e2e] bg-[#06180f] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[#9fffbf] transition-colors duration-200 group-hover:border-[#00ff5e88] group-hover:text-white">
          {linkLabel}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <SpotlightCard className="group h-full min-w-0 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.28)] hover:border-[#00ff5e77] hover:bg-[#00ff5e0d] xs:p-5">
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100b]"
        >
          {content}
        </a>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="h-full min-w-0 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.28)] xs:p-5">
      {content}
    </SpotlightCard>
  );
};

export default ContactInfoCard;
