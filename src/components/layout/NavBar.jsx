import React from "react";
import { NavLink } from "react-router";

const NavBar = () => {
  const items = [
    { to: "/", label: "About" },
    { to: "/resume", label: "Resume" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full">
      <ul className="flex flex-wrap items-center gap-2 xs:gap-3">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 xs:px-4 xs:text-xs",
                  isActive
                    ? "border-[#00ff5e99] bg-[#00ff5e1a] text-white"
                    : "border-[#00ff5e22] text-[#9fffbf] hover:border-[#00ff5e55] hover:bg-[#00ff5e12] hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
