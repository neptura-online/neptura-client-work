import { motion } from "framer-motion";

interface GalleryModalProps {
  image: string;
  onClose: () => void;
}

const GalleryModal = ({ image, onClose }: GalleryModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-xl"
      >
        ✕
      </button>

      <div className="w-[70vw] max-w-3xl h-fit sm:h-[75vh] overflow-y-auto rounded-2xl bg-black">
        <img src={image} alt="" className="w-full object-contain" />
      </div>
    </motion.div>
  );
};

export default GalleryModal;
