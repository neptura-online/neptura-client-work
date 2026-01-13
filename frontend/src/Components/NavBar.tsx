import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const NavBar = () => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 70) setNavBg(true);
      if (window.scrollY < 70) setNavBg(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div
      className={`${
        navBg ? "bg-[#0a040f]/90 shadow-md" : ""
      } transition-all duration-200 z-500 fixed w-full`}
    >
      <div className="w-full max-w-380 mx-auto ">
        <div className="relative z-10 flex  items-center justify-between px-3 py-2 lg:px-16 ">
          <div className="flex items-center gap-2">
            <img
              src="/assets/logowhite.webp"
              alt="Logo"
              className="h-15 md:h-20 w-auto"
              loading="lazy"
            />
          </div>

          <div className="items-center gap-4 flex ">
            <a
              href="/"
              className="hidden text-white md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base"
            >
              <FaEnvelope />
              Email ID@e-marketing.io
            </a>
            <a
              href="/"
              className="flex items-center gap-2 rounded-xl bg-(--yellow-emarketing) px-4 py-3 text-sm lg:text-base text-black"
            >
              <FiPhone />
              +91-9602694444
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
