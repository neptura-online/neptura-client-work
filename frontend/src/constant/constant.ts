import type { Testimonial } from "../types/type";
import {
  FiLayout,
  FiClock,
  FiTarget,
  FiMessageSquare,
  FiLayers,
  FiSmartphone,
  FiShield,
  FiBarChart2,
  FiTrendingUp,
  FiZap,
  FiRepeat,
  FiDollarSign,
  FiSliders,
  FiBriefcase,
  FiEye,
} from "react-icons/fi";
import { HiOutlineTrendingDown } from "react-icons/hi";
import {
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
} from "react-icons/hi2";

export const navLinks = [
  { id: 1, url: "/", label: "Home" },
  { id: 2, url: "#about", label: "About Us" },
  { id: 3, url: "#services", label: "Services" },
  { id: 4, url: "#", label: "Testimonials" },
  { id: 5, url: "#", label: "Case Studies" },
  { id: 6, url: "#", label: "Contact Us" },
];

export const steps = [
  {
    title: "Understanding Business & Offer",
    desc: "We dig into product USPs, audience pain points, and objections to define what the landing page must solve.",
  },
  {
    title: "Preparing Winning Narrative",
    desc: "Messaging that is emotional, logical, and structured like a funnel to move users from awareness to action.",
  },
  {
    title: "High-Converting Design",
    desc: "UI/UX that reduces friction, improves clarity, and builds trust — especially for paid traffic.",
  },
  {
    title: "Advanced Form Engineering",
    desc: "Conditional logic, hidden fields, tracking, popups, and multi-form flows optimized for lead generation.",
  },
  {
    title: "Full Technical Setup",
    desc: "UTM tracking, GA4, GTM, Pixel, CAPI, CRM integration, schema, security, and performance optimization.",
  },
  {
    title: "Continuous Optimization",
    desc: "Post-launch tracking, behavior analysis, and refinements to maximize conversion rates.",
  },
];

export const problems = [
  { id: 1, text: "Confusing layouts", icon: FiLayout },
  { id: 2, text: "Slow loading time", icon: FiClock },
  { id: 3, text: "No clear Call To Action", icon: FiTarget },
  { id: 4, text: "Weak messaging", icon: FiMessageSquare },
  { id: 5, text: "Information overload", icon: FiLayers },
  { id: 6, text: "Poor mobile experience", icon: FiSmartphone },
  { id: 7, text: "No trust-building", icon: FiShield },
  { id: 8, text: "No way to capture data", icon: FiBarChart2 },
];

export const ITEMS = [
  {
    title: "Business-Owner Mindset",
    desc: "We think like founders — revenue, positioning, and long-term scalability come first.",
    icon: FiBriefcase,
  },
  {
    title: "Transparent Process",
    desc: "Clear communication, predictable timelines, and complete visibility at every stage.",
    icon: FiEye,
  },
  {
    title: "Control in Your Hands",
    desc: "You retain full ownership of assets, data, and decisions. No lock-ins. Ever.",
    icon: FiSliders,
  },
  {
    title: "Consistent Lead Generation",
    desc: "We build systems designed to attract, qualify, and convert — consistently.",
    icon: FiTrendingUp,
  },
  {
    title: "ROI-Driven Approach",
    desc: "Every decision is tied to measurable impact, not visual preference.",
    icon: FiDollarSign,
  },
];

export const pillars = [
  {
    title: "Clear & Persuasive Messaging",
    icon: FiTarget,
  },
  {
    title: "Proven Conversion Frameworks",
    icon: FiTrendingUp,
  },
  {
    title: "Fast-Loading, Mobile-Optimized Pages",
    icon: FiZap,
  },
  {
    title: "Behavioural UX + UI Design",
    icon: FiShield,
  },
  {
    title: "High-trust Elements",
    icon: FiBarChart2,
  },
  {
    title: "Heatmap-Optimized Layouts",
    icon: FiRepeat,
  },
  {
    title: "Ad-to-Landing Page Relevance Matching",
    icon: FiRepeat,
  },
  {
    title: "Tracking, Analytics & Pixel Setup",
    icon: FiRepeat,
  },
  {
    title: "A/B Testing for Continuous Improvement",
    icon: FiRepeat,
  },
];

export const landingProblems = [
  {
    icon: HiOutlineUsers,
    text: "You lose high-intent leads",
  },
  {
    icon: HiOutlineCurrencyDollar,
    text: "Your ad budget burns with no ROI",
  },
  {
    icon: HiOutlineTrendingDown,
    text: "Competitors capture the same leads",
  },
  {
    icon: HiOutlineUsers,
    text: "Your sales team remains under-utilized",
  },
  {
    icon: HiOutlineChartBar,
    text: "Revenue opportunities slip away",
  },
];

export const faqs = [
  {
    q: "1. How is your landing page different from what other agencies deliver?",
    a: "Most agencies focus on looks. We focus on conversion science with copywriting, UX flow, tracking, A/B psychology, load speed, and integrated forms. You don’t just get a page. You get a conversion engine.",
  },
  {
    q: "2. How long does it take to build a high-converting landing page?",
    a: "Typically 7–10 working days, depending on complexity, integrations, and form workflows. If you need an express delivery, we can accommodate that too.",
  },
  {
    q: "3. Do you write the copy for the landing page?",
    a: "Yes. All copy is written in-house by conversion-focused writers, based on your audience, offer, USP, and ad funnel intent.",
  },
  {
    q: "4. Do you handle form integration, CRM setup, and tracking?",
    n: "Absolutely",
    h: " We set up:",
    a: `      • UTM tracking
              • Pixel + GA4 + GTM events
              • CRM mapping (HubSpot, Zoho, LeadSquared, Pabbly)
              • Hidden fields + champion/partner tracking
              • Popup forms / exit intent
`,
  },
  {
    q: "5. Will the landing page be SEO-friendly?",
    n: "Yes, but with a conversion-first mindset.\n",
    h: "We add:\n",
    a: `    • Meta tags
            • OG tags
            • Schema
            • Image optimization
        The goal is speed + relevance + high conversions.
`,
  },
  {
    q: "6. Will my landing page be mobile-optimized?",
    a: "Yes, 70%+ of ad traffic is mobile. Your page will be fully responsive with 70–80+ mobile PageSpeed score, fast loading, and scroll-friendly UX.",
  },
  {
    q: "7. Can you build multiple landing pages for different campaigns?",
    n: "Yes,",
    h: " we offer packages for:",
    a: `    • Multiple niche-specific LPs
            • A/B variants
            • Multi-city campaigns
            • Multi-keyword campaigns
            • High-volume performance funnels
`,
  },
];

export const counterData = [
  { id: 1, number: "257", text: "Landing Pages Built" },
  { id: 2, number: "37", text: "Industries Served" },
  { id: 3, number: "15", text: "Countries Served" },
  { id: 4, number: "83%", text: "Client Retention" },
  { id: 5, number: "43", text: "Marketing Experts" },
];

export const services = [
  {
    title: "Google Ads",
    desc: "Precision-targeted campaigns for Lead Gen & E-com growth.",
    icon: "📈",
  },
  {
    title: "Meta Ads",
    desc: "Scaling brands via high-converting social media strategies.",
    icon: "👥",
  },
  {
    title: "SEO",
    desc: "Organic search dominance to drive sustainable traffic.",
    icon: "🔍",
  },
  {
    title: "Web Design",
    desc: "High-converting UI/UX built to turn visitors into leads.",
    icon: "💻",
  },
  {
    title: "AI WhatsApp",
    desc: "Automated generative AI for 24/7 customer engagement.",
    icon: "💬",
  },
  {
    title: "CRM Integration",
    desc: "Connecting your sales data for seamless automation.",
    icon: "⚙️",
  },
  {
    title: "LinkedIn Mgmt",
    desc: "B2B authority building and executive lead generation.",
    icon: "🔗",
  },
  {
    title: "Email Marketing",
    desc: "Retention-focused newsletters with high open rates.",
    icon: "📧",
  },
  {
    title: "Automation",
    desc: "Streamline workflows and eliminate manual tasks.",
    icon: "⚡",
  },
];

export const caseStudies = [
  {
    title: "Real Estate Kolkata",
    metric: "30%",
    metricLabel: "Qualified Lead",
    description:
      "Scaled Meta Ads for a real estate client from ₹30K/month with 26% qualification to ₹4L/month with 30% qualified leads through strategic targeting and optimization.",
    highlight: true,
  },
  {
    title: "Dubai-based Copperware Brand",
    metric: "4",
    metricLabel: "ROAS",
    description:
      "Increased sales by scaling from 3K AED spend & 1.7 ROAS to 12K AED spend & 4 ROAS using Meta & Google Ads.",
  },
  {
    title: "Laminate Manufacturer",
    metric: "54%",
    metricLabel: "Quality Rate",
    description:
      "Improved 20k+ qualified leads/month at 54% quality rate with approximate revenue of ₹1.5Cr/month over 2+ years.",
  },
  {
    title: "Interior Surface Solutions",
    metric: "20+",
    metricLabel: "ROAS",
    description:
      "Scaled ads from ₹5K to ₹3L/month generating 20+ ROAS in 18 months using Meta & Google Ads.",
    darkPreview: true,
  },
  {
    title: "Silverware Gifting & Furniture",
    metric: "2K+",
    metricLabel: "Organic Clicks",
    description:
      "Ranked top SERP for Silver Wedding Gift & Furniture with 2K+ monthly organic clicks in 9 months.",
  },
  {
    title: "Pipe Manufacturer",
    metric: "30%",
    metricLabel: "Conversion",
    description:
      "Scaled international leads from 1 to 36 at ₹33K spend with 30% quality conversion & ₹30L+ closures.",
  },
  {
    title: "USA Based D2C Apparel Brand",
    metric: "USA",
    metricLabel: "Brand",
    description:
      "Scaled Meta Ads from $2K & 1.9 ROAS to $5K spend & 4.0 ROAS in the USA market.",
  },
  {
    title: "Real Estate Delhi NCR",
    metric: "1K+",
    metricLabel: "Leads",
    description:
      "Generated 1000+ leads/month at ₹250 CPL with 30% qualification using Meta & Google Ads.",
  },
  {
    title: "Copperware Manufacturer",
    metric: "ROAS",
    metricLabel: "BOOST",
    description:
      "Scaled ad spend from ₹30K to ₹6.5L/month while boosting ROAS from 3.2 to 7.3.",
  },
];

export const testimonials: Testimonial[] = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: "/assets/user.png",
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: "/assets/user.png",
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: "/assets/user.png",
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: "/assets/user.png",
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: "/assets/user.png",
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: "/assets/user.png",
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: "/assets/user.png",
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: "/assets/user.png",
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: "/assets/user.png",
    name: "Casey Harper",
    username: "@casey09",
  },
];
