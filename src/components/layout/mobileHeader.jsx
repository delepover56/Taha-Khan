import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { to: "/", label: "About" },
    { to: "/resume", label: "Resume" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  const handleClick = (to) => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-[120] w-full lg:hidden">
      <div className="flex items-center justify-between rounded-2xl border border-[#00ff5e26] bg-[#0a120db8] px-4 py-3 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)] xs:px-5 xs:py-4">
        <button
          type="button"
          onClick={() => handleClick("/")}
          className="merienda text-lg text-[#00ff5e] xs:text-xl"
        >
          Taha Khan
        </button>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-[#00ff5e44] bg-[#06180f] transition-all duration-300 hover:border-[#00ff5e] hover:bg-[#00ff5e1a] xs:h-11 xs:w-11"
        >
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "opacity-0" : "my-[5px]",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
        />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-50 flex h-full w-64 flex-col border-l border-[#00ff5e26] bg-[#0a110d] px-6 pt-8 transition-transform duration-300 xs:w-72",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="merienda text-xl text-[#00ff5e] xs:text-2xl">
              Menu
            </p>
            <p className="poppins text-xs uppercase tracking-[0.3em] text-[#9fffbf]">
              Navigate
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-[#00ff5e44] bg-[#06180f] px-3 py-3 flex-col justify-center items-center text-xs uppercase tracking-[0.25em] text-[#9fffbf]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
            </svg>

          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => handleClick(item.to)}
              className={({ isActive }) =>
                [
                  "rounded-xl border px-4 py-3 text-sm uppercase tracking-[0.28em] transition-all duration-300",
                  isActive
                    ? "border-[#00ff5e88] bg-[#00ff5e1a] text-white shadow-[0_0_18px_rgba(0,255,94,0.22)]"
                    : "border-[#00ff5e1f] text-[#9fffbf] hover:border-[#00ff5e55] hover:bg-[#00ff5e12] hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-[#00ff5e26] bg-[#0b120d] p-4 text-center">
          <p className="poppins text-xs uppercase tracking-[0.28em] text-[#9fffbf]">
            Open to work
          </p>
          <p className="merienda text-lg text-white">Lets build something</p>
        </div>
      </aside>
    </header>
  );
};

export default MobileHeader;
