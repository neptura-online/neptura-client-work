import { motion } from "framer-motion";
interface text {
  white: string;
  yellow: string;
}

const Heading = ({ white, yellow }: text) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-[40px] font-medium text-white leading-[1.2em] capitalize"
      >
        {white} <span className="text-yellow-500">{yellow}</span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-yellow-500"
      />
    </>
  );
};

export default Heading;
