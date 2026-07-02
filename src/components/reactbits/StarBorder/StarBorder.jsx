const StarBorder = ({
  children,
  className = "",
  color = "#00ff5e",
  href,
  target,
  rel,
  contentClassName = "",
  ...props
}) => {
  const content = (
    <>
      <span className="pointer-events-none absolute inset-[-40%] animate-[starBorderSpin_7s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,var(--star-border-color)_40deg,transparent_80deg,transparent_360deg)] opacity-70 motion-reduce:animate-none" />
      <span
        className={[
          "relative z-10 rounded-[15px] bg-[#06180f] px-6 py-3 md:w-max w-full text-center",
          contentClassName,
        ].join(" ")}
      >
        {children}
      </span>
    </>
  );
  const classes = [
    "relative inline-flex overflow-hidden rounded-2xl border border-[#00ff5e55] bg-[#06180f] p-[1px] text-[#00ff5e]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]",
    className,
  ].join(" ");
  const style = { "--star-border-color": color, ...props.style };

  if (href) {
    return (
      <a
        {...props}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...props}
      className={classes}
      style={style}
    >
      {content}
    </button>
  );
};

export default StarBorder;
