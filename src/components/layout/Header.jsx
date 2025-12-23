import { NavLink, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/", label: "About" },
    { to: "/resume", label: "Resume" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  const handleClick = (event, to) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(to), 200);
  };

  return (
    <header className="sticky top-4 z-[100] hidden w-full items-center justify-between rounded-2xl border border-[#00ff5e26] bg-[#0a120db8] px-6 py-4 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)] lg:flex">
      <NavLink
        to="/"
        onClick={(event) => handleClick(event, "/")}
        className="group flex items-center gap-4"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00ff5e44] bg-[#06180f] text-[#00ff5e] shadow-[0_0_16px_rgba(0,255,94,0.25)] transition-all duration-300">
          <img src="./favicon.png" alt="Logo" />
        </div>
        <div className="leading-tight">
          <p className="merienda text-2xl text-[#00ff5e] hover:text-white transition-all duration-200">Taha Khan</p>
          {/* <p className="poppins text-[10px] uppercase tracking-[0.32em] text-[#9fffbf]">
            Front-End Developer
          </p> */}
        </div>
      </NavLink>

      <nav>
        <ul className="flex items-center gap-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={(event) => handleClick(event, item.to)}
                className={({ isActive }) =>
                  [
                    "rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.28em] transition-all duration-300",
                    isActive
                      ? "border-[#00ff5e88] bg-[#00ff5e1a] text-white shadow-[0_0_18px_rgba(0,255,94,0.25)]"
                      : "border-transparent text-[#9fffbf] hover:border-[#00ff5e55] hover:bg-[#00ff5e12] hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2 rounded-full border border-[#00ff5e2e] bg-[#07180f] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#00ff5e] shadow-[0_0_8px_rgba(0,255,94,0.6)] animate-[glowPulse_2.8s_ease-in-out_infinite]" />
        <span className="poppins text-[11px] uppercase tracking-[0.26em] text-[#9fffbf]">
          Open to work
        </span>
      </div>
    </header>
  );
};

export default Header;
