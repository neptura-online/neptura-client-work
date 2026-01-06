import { FaWhatsapp } from "react-icons/fa";
import type { OpenFormProps } from "../../types/type";

const Buttons = ({ setOpenForm, setId }: OpenFormProps) => {
  const handleClick = () => {
    setOpenForm(true);
    setId("enquiry now sticky button");
  };
  return (
    <div className="fixed z-60 flex flex-col ">
      <div className="fixed bottom-9 right-3 z-60">
        <a
          href="https://wa.me/"
          target="_blank"
          className="
    bg-green-500 text-white rounded-full 
    w-15 h-15 flex items-center justify-center 
    focus:outline-none
    animate-bounce
    ring-4 ring-green-400/40
    shadow-[0_0_25px_rgba(34,197,94,0.9)]
    hover:shadow-[0_0_40px_rgba(34,197,94,1)]
    transition-all duration-300
  "
        >
          <FaWhatsapp className="w-7 h-7" />
        </a>
      </div>
      <div className="fixed sm:hidden flex bottom-0 w-screen z-50">
        <a
          onClick={handleClick}
          className="w-[50%] uppercase text-center py-3 bg-black text-white"
        >
          Enquiry now
        </a>
        <a
          href=""
          className="uppercase w-[50%]  py-3 bg-(--yellow-emarketing) text-center"
        >
          call now
        </a>
      </div>
    </div>
  );
};

export default Buttons;
