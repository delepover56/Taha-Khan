const MagicBento = ({
  items = [],
  className = "",
  staticMode = false,
  glowColor = "0, 255, 94",
}) => {
  return (
    <div
      className={[
        "grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3",
        className,
      ].join(" ")}
      style={{ "--magic-bento-glow": glowColor }}
      role="list"
    >
      {items.map((item) => (
        <article
          key={item.title}
          className={[
            "group min-w-0 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-5",
            "shadow-[0_14px_32px_rgba(0,0,0,0.26),0_0_0_1px_rgba(var(--magic-bento-glow),0.03)]",
            staticMode
              ? ""
              : "transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e12] hover:shadow-[0_14px_32px_rgba(0,0,0,0.3),0_0_24px_rgba(var(--magic-bento-glow),0.08)] focus-within:border-[#00ff5e88] motion-reduce:transition-none",
            item.featured ? "md:col-span-2" : "",
          ].join(" ")}
          role="listitem"
        >
          <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
            {item.label}
          </p>
          <h3 className="roboto-slab type-h4 mt-3 text-white">
            {item.title}
          </h3>
          {item.description && (
            <p className="poppins type-body-sm mt-2 text-[#c7ffd8]">
              {item.description}
            </p>
          )}
          {item.children}
        </article>
      ))}
    </div>
  );
};

export default MagicBento;
