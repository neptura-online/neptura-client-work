import { useEffect } from "react";
import { motion } from "framer-motion";

interface GalleryModalProps {
  image: string;
  onClose: () => void;
}

const GalleryModal = ({ image, onClose }: GalleryModalProps) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-1000 bg-black/70 flex items-center justify-center w-screen h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute w-[90vw] top-10 sm:top-25 max-w-3xl h-[60vh] sm:h-[75vh] overflow-y-scroll overflow-hidden  bg-black"
      >
        <img src={image} alt="" className="w-full object-contain" />
      </div>
      <button
        onClick={onClose}
        className="absolute bg-gray-300/30 px-4 py-2.5 bottom-30 sm:bottom-8 cursor-pointer text-white text-xl rounded-full"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default GalleryModal;
