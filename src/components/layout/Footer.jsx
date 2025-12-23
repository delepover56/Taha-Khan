import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[#00ff5e22] pt-6 text-center text-sm text-[#9fffbf] md:flex-row md:text-left">
        <p className="poppins">
          Copyright 2025 Taha Khan. All rights reserved.
        </p>
        <p className="poppins text-xs uppercase tracking-[0.28em] text-[#7feaa0]">
          Built with React, Vite, Tailwind
        </p>
      </div>
    </footer>
  );
};

export default Footer;
