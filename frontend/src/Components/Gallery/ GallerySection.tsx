import { useState } from "react";
import { motion } from "framer-motion";
import HoverScrollCard from "./HoverScrollCard";
import GalleryModal from "./GalleryModal";

const images = Array(8).fill(
  "https://images.squarespace-cdn.com/content/635062e6a6b96b67e85bd255/c8eda825-1f05-4ea8-9482-7aec2a294f3f/image-asset.jpeg?format=1500w"
);

const GallerySection = () => {
  const [active, setActive] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className="overflow-hidden py-10">
        <motion.div
          className="flex gap-8"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{
            repeat: paused ? 0 : Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((img, i) => (
            <HoverScrollCard
              key={i}
              image={img}
              onClick={() => setActive(img)}
              onPreviewStart={() => setPaused(true)}
              onPreviewEnd={() => setPaused(false)}
            />
          ))}
        </motion.div>
      </div>

      {active && (
        <GalleryModal image={active} onClose={() => setActive(null)} />
      )}
    </>
  );
};

export default GallerySection;
