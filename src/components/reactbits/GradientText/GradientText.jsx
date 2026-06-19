const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={[
        "bg-[linear-gradient(90deg,#7feaa0_0%,#00ff5e_45%,#c7ffd8_100%)] bg-clip-text text-transparent",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
};

export default GradientText;
