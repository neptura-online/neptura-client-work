import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiSettings,
  FiZap,
  FiDatabase,
  FiUploadCloud,
} from "react-icons/fi";
import Heading from "./Helper/Heading";

type ServiceItem = {
  title: string;
  image: string;
  points: string[];
  icon: JSX.Element;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Advanced Form System",
    image: "/assets/Advanced Form System.png  ",
    icon: <FiSettings />,
    points: [
      "Paid Gravity Forms addon integration",
      "Advanced fields and multi-step logic",
      "Multiple enquiry forms setup",
      "Individual email alerts for each form",
      "Full form validation",
      "Google Sheet lead sync",
      "Instant email notifications",
      "Button-triggered popup forms",
      "Page-load & exit-intent popup forms",
      "Thank You Pages (Static + Dynamic)",
    ],
  },
  {
    title: "On-Page Conversion Enhancers",
    image: "/assets/On-Page Conversion Enhancers.png",
    icon: <FiTrendingUp />,
    points: [
      "Live Chat Bot setup",
      "WhatsApp Click-to-Chat integration",
      "Sticky CTAs",
      "Multiple CTA placements optimized by scroll-depth",
    ],
  },
  {
    title: "Performance Engineering",
    image: "/assets/Performance Engineering.png",
    icon: <FiZap />,
    points: [
      "Fully mobile responsive",
      "Minified CSS/JS",
      "Lazy loading",
      "High page speed score",
    ],
  },
  {
    title: "Advanced Tracking & Analytics",
    image: "/assets/Advanced Tracking & Analytics.png",
    icon: <FiActivity />,
    points: [
      "Full UTM tracking",
      "Page URL & Campaign Name Tracking",
      "CRM data mapping",
      "Button click tracking",
      "Form submission tracking",
      "WhatsApp click tracking",
      "GA4, GTM, FB Pixel, CAPI setup",
    ],
  },
  {
    title: "CRM-Ready Integrations",
    image: "/assets/CRM-Ready Integrations.png",
    icon: <FiDatabase />,
    points: [
      "Zoho CRM",
      "HubSpot",
      "LeadSquared",
      "Pabbly Connect",
      "Webhooks & automation setup",
    ],
  },
  {
    title: "SEO Foundation",
    image: "/assets/SEO Foundation.png",
    icon: <FiTrendingUp />,
    points: [
      "SEO-friendly structure",
      "Custom meta tags",
      "OG tags for social sharing",
      "Schema Markup",
      "Alt tags for all images",
    ],
  },
  {
    title: "Security & Spam Protection",
    image: "/assets/Security & Spam Protection.png",
    icon: <FiShield />,
    points: [
      "Google reCAPTCHA v2/v3",
      "Advanced spam filtering",
      "Form security settings",
    ],
  },
  {
    title: "Deployment & Launch Support",
    image: "/assets/Deployment & Launch Support.png",
    icon: <FiUploadCloud />,
    points: [
      "Domain & hosting access",
      "Subdomain creation",
      "DNS configuration",
      "SSL installation",
      "Email SMTP setup",
      "Google reCAPTCHA API setup",
      "Pre-launch backups",
      "Final deployment & testing",
    ],
  },
];

const MOBSERVICES: ServiceItem[] = [
  {
    title: "Advanced Form System",
    image: "/assets/online.webp",
    icon: <FiSettings />,
    points: [
      "Paid Gravity Forms addon",
      "Advanced fields & multi-step logic",
      "Multiple enquiry forms setup",
      "Individual email alerts",
      "Full form validation",
      "Google Sheet lead sync",
      "Popup & exit-intent forms",
      "Thank You Pages (Static + Dynamic)",
    ],
  },
  {
    title: "On-Page Conversion Enhancers",
    image: "/assets/online.webp",
    icon: <FiTrendingUp />,
    points: [
      "Live Chat Bot setup",
      "WhatsApp Click-to-Chat",
      "Sticky CTAs",
      "Multiple CTA placements",
      "Scroll-depth optimization",
    ],
  },
  {
    title: "Performance Engineering",
    image: "/assets/online.webp",
    icon: <FiZap />,
    points: [
      "Fully mobile responsive",
      "Minified CSS & JS",
      "Lazy loading strategy",
      "High PageSpeed score",
    ],
  },
  {
    title: "Advanced Tracking & Analytics",
    image: "/assets/online.webp",
    icon: <FiActivity />,
    points: [
      "Full UTM tracking",
      "Campaign & URL tracking",
      "Button & form tracking",
      "WhatsApp click tracking",
      "GA4, GTM, FB Pixel, CAPI",
    ],
  },
  {
    title: "CRM-Ready Integrations",
    image: "/assets/online.webp",
    icon: <FiDatabase />,
    points: [
      "Zoho CRM",
      "HubSpot",
      "LeadSquared",
      "Pabbly Connect",
      "Webhooks & automation",
    ],
  },
  {
    title: "SEO Foundation",
    image: "/assets/online.webp",
    icon: <FiTrendingUp />,
    points: [
      "SEO-friendly structure",
      "Custom meta tags",
      "OG tags",
      "Schema Markup",
      "Image alt optimization",
    ],
  },
  {
    title: "Security & Spam Protection",
    image: "/assets/online.webp",
    icon: <FiShield />,
    points: [
      "Google reCAPTCHA v2/v3",
      "Advanced spam filtering",
      "Form security rules",
    ],
  },
  {
    title: "Deployment & Launch Support",
    image: "/assets/online.webp",
    icon: <FiUploadCloud />,
    points: [
      "Domain & hosting access",
      "DNS & SSL setup",
      "Email SMTP configuration",
      "Pre-launch backups",
      "Final deployment & testing",
    ],
  },
];

export default function AdvancedServices() {
  return (
    <section className="relative bg-zinc-950 py-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-6">
          <Heading white="What You Get" yellow="From Us?" />
        </div>
        <DesktopServices />
        <MobileServices />
      </div>
    </section>
  );
}

const MobileServices = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 lg:hidden">
      {MOBSERVICES.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-yellow-400">{item.icon}</span>
                <span className="text-left font-medium">{item.title}</span>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="px-5 pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-4 rounded-xl border border-white/10"
                  />

                  <ul className="space-y-3 text-sm text-zinc-300">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <FiCheckCircle className="mt-0.5 text-yellow-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

function DesktopServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];

  return (
    <div className="hidden lg:grid grid-cols-1 gap-14 lg:grid-cols-3">
      <div className="flex flex-col gap-3">
        {SERVICES.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-4 rounded-2xl px-6 py-3 text-left transition
                    ${
                      isActive
                        ? "bg-yellow-400 text-black shadow-lg"
                        : "bg-zinc-900 text-white hover:bg-zinc-800"
                    }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium text-base">{item.title}</span>
            </button>
          );
        })}
      </div>

      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.image}
            src={active.image}
            alt={active.title}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="rounded-3xl border border-white/10 shadow-2xl"
          />
        </AnimatePresence>
      </div>

      <div>
        <h3 className="mb-6 text-2xl font-semibold text-yellow-400">
          {active.title}
        </h3>

        <ul className="space-y-4 text-sm">
          {active.points.map((point) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-zinc-300"
            >
              <FiCheckCircle className="mt-1 text-base text-yellow-400" />
              <span className="text-base">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
