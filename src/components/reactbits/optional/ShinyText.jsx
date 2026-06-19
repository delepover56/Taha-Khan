const ShinyText = ({ children, className = "" }) => {
  return (
    <span
      className={[
        "bg-[linear-gradient(110deg,#7feaa0_0%,#c7ffd8_35%,#00ff5e_50%,#7feaa0_65%,#7feaa0_100%)] bg-[length:220%_100%] bg-clip-text text-transparent",
        "animate-[shineText_5s_ease-in-out_infinite] motion-reduce:animate-none",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
};

export default ShinyText;
