import { FaPhone } from "react-icons/fa";
import logo from "/assets/logowhite.webp";

const NavBar = () => {
  return (
    <div
      className={
        "bg-black shadow-md shadow-yellow-500/10 transition-all duration-200 h-[10vh] z-50 fixed w-screen"
      }
    >
      <div className="flex items-center h-full justify-between w-[90%] lg:max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 justify-center">
          <a href="/">
            <img
              src={logo}
              alt="logo"
              className="h-15 w-28 lg:h-25 lg:w-40 lg:py-4 py-2"
            />
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="tel:910-###-####"
            className="flex items-center md:px-12 md:py-2.5 px-4 py-3 text-black font-semibold md:font-bold text-sm md:text-base bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 rounded-2xl "
          >
            <span className="pr-2">
              <FaPhone className="rotate-80 " />
            </span>{" "}
            <span className="hidden md:block">Call Us : </span> 9602694444
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
