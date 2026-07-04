const ProfileCard = ({
  avatar,
  name,
  role,
  status,
  experience,
  children,
  actions,
  className = "",
}) => {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-[#00ff5e36] bg-[#07100bcc] p-5 backdrop-blur-xl shadow-[0_18px_38px_rgba(0,0,0,0.58)]",
        "w-full max-w-full xxs:p-6 sm:p-7",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,94,0.07),_rgba(5,12,8,0.22)_42%,_transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-[#00ff5e66] to-transparent" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center md:items-start gap-3 xs:items-center xs:gap-4">
          {avatar}
          <div className="min-w-0 flex flex-col items-center md:items-start gap-1">
            <p className="merienda type-h3 text-white text-center md:text-start">{name}</p>
            <p className="poppins type-caption uppercase tracking-[0.32em] text-[#9fffbf] text-center md:text-start">
              {role}
            </p>
            <div className="flex flex-col items-center lg:items-start lg:flex-col gap-2 mt-2 md:flex-row md:items-center">
              {status}
              {experience}
            </div>
          </div>
        </div>
        {children}
        {actions}
      </div>
    </div>
  );
};

export default ProfileCard;
