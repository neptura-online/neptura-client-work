import type { Testimonial } from "../types/type";

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
    desc: "We dig into product USPs, audience pain points, and objections to build core elements that a landing page must solve.",
    url: "/assets/Understanding.webp",
  },
  {
    title: "Preparing Winning Narrative",
    desc: "Messaging that is emotional, logical, and structured like a funnel to guide visitors from awareness to action in seconds.",
    url: "/assets/Winning.webp",
  },
  {
    title: "High-Converting Design",
    desc: "UI/UX that reduces friction, boosts clarity, and enhances trust especially for paid traffic.",
    url: "/assets/High-Converting.webp",
  },
  {
    title: "Advanced Form Engineering",
    desc: "Conditional logic, hidden fields, tracking, multiple forms, popups, everything optimized for quick lead generations.",
    url: "/assets/Engineering.webp",
  },
  {
    title: "Full Technical Setup",
    desc: "UTM tracking, GA4, GTM, FB Pixel, CAPI, CRM integration, schema, security, faster load, everything your conversions depend on.",
    url: "/assets/Technical.webp",
  },
  {
    title: "Continuous Optimization",
    desc: "After launch, we track behaviour and refine the page for max conversions.",
    url: "/assets/Optimization.webp",
  },
];

export const problems = [
  {
    id: 1,
    text: "Confusing or cluttered layouts.",
    url: "/icons/layouts.webp",
  },
  {
    id: 2,
    text: "Weak messaging that doesn’t connect.",
    url: "/icons/Weak_messaging.webp",
  },
  { id: 3, text: "Slow loading time", url: "/icons/loading.webp" },
  { id: 4, text: "No clear Call To Action", url: "/icons/call-to-action.webp" },

  { id: 5, text: "Information overload", url: "/icons/overload.webp" },
  { id: 6, text: "Poor mobile experience", url: "/icons/experience.webp" },
  { id: 7, text: "No trust-building elements", url: "/icons/trust.webp" },
  {
    id: 8,
    text: "Not able to capture analizable data",
    url: "/icons/analizable_data.webp",
  },
];

export const ITEMS = [
  {
    title: "Business-Owner Mindset",
    desc: "We think like founders — revenue, positioning, and long-term scalability come first.",
    url: `/icons/Business-Owner.webp`,
  },
  {
    title: "Transparent Process",
    desc: "Clear communication, predictable timelines, and complete visibility at every stage.",
    url: "/icons/Transparent.webp",
  },
  {
    title: "Control in Your Hands",
    desc: "You retain full ownership of assets, data, and decisions. No lock-ins. Ever.",
    url: "/icons/Hands.webp",
  },
  {
    title: "Consistent Lead Generation",
    desc: "We build systems designed to attract, qualify, and convert — consistently.",
    url: "/icons/Lead_Generation.webp",
  },
  {
    title: "ROI-Driven Approach",
    desc: "Every decision is tied to measurable impact, not visual preference.",
    url: "/icons/ROI-Driven.webp",
  },
];

export const pillars = [
  {
    title: "Clear & Persuasive Messaging",
    url: "/icons/Clear.webp",
  },
  {
    title: "Proven Conversion Frameworks",
    url: "/icons/Proven.webp",
  },
  {
    title: "Behavioural UX + UI Design",
    url: "/icons/Behavioural.webp",
  },
  {
    title: "High-trust Elements",
    url: "/icons/High-trust.webp",
  },
  {
    title: "Heatmap-Optimized Layouts",
    url: "/icons/Heatmap.webp",
  },
  {
    title: "Tracking, Analytics & Pixel Setup",
    url: "/icons/Tracking.webp",
  },
  {
    title: "Fast-Loading, Mobile-Optimized Pages",
    url: "/icons/Fast-Loading.webp",
  },
  {
    title: "Ad-to-Landing Page Relevance Matching",
    url: "/icons/Ad-to-Landing.webp",
  },

  {
    title: "A/B Testing for Continuous Improvement",
    url: "/icons/Testing.webp",
  },
];

export const landingProblems = [
  {
    url: "/icons/leads.webp",
    text: "You lose high-intent leads",
  },
  {
    url: "/icons/budget.webp",
    text: "Your ad budget burns with no ROI",
  },
  {
    url: "/icons/revenue.webp",
    text: "You lose revenue opportunities that should have been yours",
  },
  {
    url: "/icons/Competitors.webp",
    text: "Competitors grab the same leads because their pages convert better",
  },
  {
    url: "/icons/under-utilized.webp",
    text: "Your sales team remains under-utilized",
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
    title: "Google Ads (Lead Gen + E-com)",
    desc: "Precision-targeted campaigns for Lead Gen & E-com growth.",
    icon: "📈",
  },
  {
    title: "Meta Ads (Lead Gen + E-com)",
    desc: "Scaling brands via high-converting social media strategies.",
    icon: "👥",
  },
  {
    title: "Search Engine Optimization (SEO)",
    desc: "Organic search dominance to drive sustainable traffic.",
    icon: "🔍",
  },
  {
    title: "Website Design & Development ",
    desc: "High-converting UI/UX built to turn visitors into leads.",
    icon: "💻",
  },
  {
    title: "Generative AI Powered WhatsApp Marketing ",
    desc: "Automated generative AI for 24/7 customer engagement.",
    icon: "💬",
  },
  {
    title: "CRM Integration",
    desc: "Connecting your sales data for seamless automation.",
    icon: "⚙️",
  },
  {
    title: "LinkedIn Management & Lead Generation",
    desc: "B2B authority building and executive lead generation.",
    icon: "🔗",
  },
  {
    title: "Email Marketing",
    desc: "Retention-focused newsletters with high open rates.",
    icon: "📧",
  },
  {
    title: "Business Automation",
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
      "Scaled Ads for a real estate client from ₹30K/month with 13% qualification to ₹4L/month with 30% qualified leads through strategic targeting and optimization.",
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
      "Optimized Google & Meta for a laminates brand, improving 20k+ qualified leads/month at 54% quality rate and approximate revenue of 1.5Cr/Month over 2+ years.",
  },
  {
    title: "Interior Surface Solutions",
    metric: "20+",
    metricLabel: "ROAS",
    description:
      "Launched and scaled a new wall panel & interior brand's Ads spend from 5k to ₹3L/month while generating 20+ ROAS in 18 months using Meta and Google Ads.",
    darkPreview: true,
  },
  {
    title: "Silverware Gifting & Furniture",
    metric: "2K+",
    metricLabel: "Organic Clicks",
    description:
      "Ranked silver gifting brand on top SERP for “Silver Wedding Gift” & “Silver Furniture” with 2K+ highly relevant monthly organic clicks and improved page quality metrics in 9 months.",
  },
  {
    title: "Pipe Manufacturer",
    metric: "30%",
    metricLabel: "Conversion",
    description:
      "For a hardware brand targeting international markets, we scaled leads from 1 to 36 at ₹33K spend via Meta Ads, achieving 30% quality conversion and ₹30L+ in closures.",
  },
  {
    title: "USA Based D2C Apparel Brand",
    metric: "USA",
    metricLabel: "Brand",
    description:
      "Scaled the clothing brand’s Meta Ads in USA Market from $2K Monthly spend & 1.9 ROAS to $5K ",
  },
  {
    title: "Real Estate Delhi NCR",
    metric: "1K+",
    metricLabel: "Leads",
    description:
      "Generated 1000+ monthly leads at ₹250 CPL for a Delhi NCR real estate client through Meta & Google.",
  },
  {
    title: "Copperware Manufacturer",
    metric: "ROAS",
    metricLabel: "BOOST",
    description:
      "Scaled a copperware manufacturer’s ad spend from ₹30K to ₹6.5L per month while boosting ",
  },
];

export const testimonials: Testimonial[] = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: "/assets/user.webp",
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: "/assets/user.webp",
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: "/assets/user.webp",
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: "/assets/user.webp",
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: "/assets/user.webp",
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: "/assets/user.webp",
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: "/assets/user.webp",
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: "/assets/user.webp",
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: "/assets/user.webp",
    name: "Casey Harper",
    username: "@casey09",
  },
];
