import { motion } from "framer-motion";

type CaseStudy = {
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  highlight?: boolean;
  images?: string[];
};

const cases: CaseStudy[] = [
  {
    title: "Real Estate Kolkata",
    metric: "30%",
    metricLabel: "Qualified Lead",
    description: `Scaled Meta Ads for a real estate client from ₹30K/month with 26% qualification to ₹4L/month with 30% qualified leads through strategic targeting and optimization.`,
  },
  {
    title: "Dubai-based Copperware Brand",
    metric: "4",
    metricLabel: "ROAS",
    description:
      "Increased sales by scaling from 3K AED spend & 1.7 ROAS to 12K AED spend & 4 ROAS using Meta & Google Ads.",
    highlight: true,
  },
  {
    title: "Laminate Manufacturer",
    metric: "54%",
    metricLabel: "Quality Rate",
    description:
      "Optimized Google & Meta Ads, improving 20k+ qualified leads/month at 54% quality rate and approx revenue of 1.5Cr/month over 2+ years.",
  },
  {
    title: "Interior Surface Solutions",
    metric: "20+",
    metricLabel: "ROAS",
    description:
      "Launched and scaled a new wall panel brand from ₹5K to ₹3L/month while generating 20+ ROAS in 18 months.",
  },
  {
    title: "Silverware Gifting & Furniture",
    metric: "2K+",
    metricLabel: "Organic Clicks",
    description:
      "Ranked on top SERP for high-intent keywords with 2K+ monthly organic clicks and improved page metrics in 9 months.",
  },
  {
    title: "Pipe Manufacturer",
    metric: "30%",
    metricLabel: "Conversion",
    description:
      "Scaled international ads from 1 to 36 at ₹33K spend achieving 30% quality conversion and ₹30L+ closures.",
  },
  {
    title: "USA Based D2C Apparel Brand",
    metric: "USA",
    metricLabel: "Brand",
    description:
      "Scaled Meta Ads in the USA from $2K spend & 1.9 ROAS to $5K spend & 4.0 ROAS.",
  },
  {
    title: "Real Estate Delhi NCR",
    metric: "1K+",
    metricLabel: "Leads",
    description:
      "Generated 1000+ monthly leads at ₹250 CPL while maintaining 30% qualification rate.",
  },
  {
    title: "Copperware Manufacturer",
    metric: "ROAS",
    metricLabel: "Boost",
    description:
      "Scaled ad spend from ₹30K to ₹6.5L/month, boosting ROAS from 3.2 to 7.3 using Meta & Google Ads.",
  },
];

export default function CaseStudies() {
  return (
    <section className="relative bg-[#160a1f] py-24">
      <div className="mx-auto max-w-360 px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Real Case Studies,{" "}
            <span className="text-yellow-400">Real ROAS</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-20 bg-white" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
            >
              {/* Hover Background */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-[#1c1c1c]"
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg font-semibold text-black group-hover:text-white transition">
                    {item.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-yellow-400">
                      {item.metric}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-black group-hover:text-white transition">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600 group-hover:text-zinc-200 transition">
                  {item.description}
                </p>

                {item.images && (
                  <div className="pointer-events-none absolute right-4 top-16 hidden group-hover:block">
                    {item.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className={`absolute w-36 rounded-lg shadow-xl ${
                          idx === 0
                            ? "-rotate-6 -top-10 right-0"
                            : "rotate-6 top-10 right-10"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
