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
      className="fixed inset-0 z-1000 bg-black/80 flex items-center justify-center w-screen min-h-screen"
    >
      <div className="relative bg-black">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg hover:scale-105 transition hover:cursor-pointer z-60"
        >
          ✕
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[90vw] max-w-3xl h-[75vh] overflow-y-scroll overflow-hidden border  bg-black"
        >
          <img
            src={image}
            alt=""
            className="w-full object-contain cursor-all-scroll"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryModal;
