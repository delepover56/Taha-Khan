const LogoLoop = ({ items = [], className = "" }) => {
  const repeatedItems = [...items, ...items];

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] py-4",
        className,
      ].join(" ")}
    >
      <div className="flex w-max gap-4 animate-[logoLoop_28s_linear_infinite] motion-reduce:animate-none">
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex min-w-24 items-center justify-center rounded-full border border-[#00ff5e22] bg-[#06180f] px-4 py-2 text-[#9fffbf]"
          >
            {item.icon && (
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className="mr-2 h-5 w-5 object-contain"
                loading="lazy"
                decoding="async"
              />
            )}
            <span className="poppins type-caption uppercase tracking-[0.24em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
