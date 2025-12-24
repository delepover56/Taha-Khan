import React, { memo } from "react";

const Footer = () => {
  return (
    <footer className="mt-10 w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[#00ff5e22] pt-6 text-center text-[#9fffbf] md:flex-row md:text-left">
        <p className="poppins type-body-sm">
          Copyright 2025 Taha Khan. All rights reserved.
        </p>
        <p className="poppins type-caption uppercase tracking-[0.28em] text-[#7feaa0]">
          Built with React, Vite, Tailwind
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
