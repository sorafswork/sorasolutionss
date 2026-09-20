import {
  Code2, PenTool, Palette, FileText, Megaphone, LifeBuoy,
  Search, Layout, Share2, Compass, Terminal, TestTube, Send, ClipboardList,
  Award, Zap, DollarSign, Smartphone, Users, Headphones, RefreshCw, MonitorSmartphone,
} from "lucide-react";
import webDevImg from "@/assets/services/web-dev.jpg";
import graphicImg from "@/assets/services/graphic-design.jpg";
import brandImg from "@/assets/services/brand-identity.jpg";
import contentImg from "@/assets/services/content-writing.jpg";
import marketingImg from "@/assets/services/digital-marketing.jpg";
import maintenanceImg from "@/assets/services/maintenance.jpg";
import seoImg from "@/assets/services/seo.jpg";
import uiuxImg from "@/assets/services/ui-ux.jpg";
import socialImg from "@/assets/services/social.jpg";

export const SERVICES = [
  { icon: Code2, image: webDevImg, title: "Website Development", desc: "Fast, SEO-ready websites built with modern frameworks.", features: ["Next.js / React", "SSR & SEO", "Blazing-fast Core Web Vitals"] },
  { icon: Palette, image: graphicImg, title: "Graphic Design", desc: "Eye-catching visuals for posts, ads, and print.", features: ["Posters & flyers", "Ad creatives", "Social kits"] },
  { icon: PenTool, image: brandImg, title: "Brand Identity", desc: "Logos, typography, and guidelines that stick.", features: ["Logo suite", "Brand book", "Color & type systems"] },
  { icon: FileText, image: contentImg, title: "Content Writing", desc: "Copy that converts across web and social.", features: ["Website copy", "Blog SEO", "Captions & scripts"] },
  { icon: Megaphone, image: marketingImg, title: "Digital Marketing", desc: "Paid + organic strategy that scales revenue.", features: ["Meta & Google Ads", "Funnels", "Analytics"] },
  { icon: LifeBuoy, image: maintenanceImg, title: "Website Maintenance", desc: "Uptime, updates and monthly care plans.", features: ["Backups", "Security", "Performance tuning"] },
  { icon: Search, image: seoImg, title: "SEO", desc: "Rank higher and get discovered by the right audience.", features: ["On-page SEO", "Technical audits", "Content clusters"] },
  { icon: Layout, image: uiuxImg, title: "UI/UX Design", desc: "Delightful, conversion-focused product design.", features: ["Wireframes", "Prototypes", "Design systems"] },
  { icon: Share2, image: socialImg, title: "Social Media Branding", desc: "A consistent, on-brand social presence.", features: ["Grid design", "Templates", "Content strategy"] },
];

export const PROCESS = [
  { icon: Compass, title: "Discovery", desc: "Understanding goals, users, and constraints." },
  { icon: Search, title: "Research", desc: "Competitor + market + audience analysis." },
  { icon: ClipboardList, title: "Planning", desc: "Scope, milestones, and success metrics." },
  { icon: Layout, title: "Wireframing", desc: "Structure and flow before pixels." },
  { icon: Palette, title: "UI Design", desc: "Premium visuals aligned to your brand." },
  { icon: Terminal, title: "Development", desc: "Clean, scalable, production-grade code." },
  { icon: TestTube, title: "Testing", desc: "QA across devices, speed, and accessibility." },
  { icon: Send, title: "Launch", desc: "Smooth deployment with zero-downtime handoff." },
  { icon: LifeBuoy, title: "Support", desc: "Ongoing care so your product keeps growing." },
];

export const WHY_US = [
  { icon: Award, title: "Professional Quality" },
  { icon: DollarSign, title: "Affordable Pricing" },
  { icon: Zap, title: "Fast Delivery" },
  { icon: RefreshCw, title: "Unlimited Revisions" },
  { icon: Search, title: "SEO Ready" },
  { icon: Smartphone, title: "Responsive Design" },
  { icon: MonitorSmartphone, title: "Modern UI" },
  { icon: Users, title: "Client First" },
  { icon: Headphones, title: "Ongoing Support" },
];

export const TESTIMONIALS = [
  { name: "Aarav Mehta", role: "Founder, Kairo Studio", quote: "SoRa turned our brand around in weeks. The site feels premium and our leads doubled." },
  { name: "Priya Sharma", role: "Marketing Lead, BrewNest", quote: "Design, copy, execution — everything was top-tier. Best agency experience I've had." },
  { name: "Rahul Verma", role: "CEO, LumenTech", quote: "They understood our vision instantly and delivered above expectations." },
  { name: "Sneha Iyer", role: "Owner, Bloom & Vine", quote: "Beautiful branding and a lightning-fast website. Zero regrets." },
  { name: "Kunal Rao", role: "Product Manager, FinNova", quote: "Professional, punctual, and endlessly creative. Highly recommend." },
  { name: "Ananya Gupta", role: "Creator, @byananya", quote: "My Instagram grew 3x after their social branding package." },
];

export const FAQS = [
  { q: "How long does a typical website take?", a: "Most websites launch in 2–4 weeks depending on scope. Landing pages can go live in as little as 5 days." },
  { q: "Do you offer revisions?", a: "Yes — we include unlimited revisions within scope until you're happy with the result." },
  { q: "Which technologies do you build with?", a: "Modern React / Next.js, TypeScript, Tailwind CSS, plus Node/Express or headless CMS where needed." },
  { q: "Will my site be SEO-friendly?", a: "Absolutely. Every project ships with technical SEO, semantic HTML, structured data, and speed optimizations." },
  { q: "Do you support post-launch?", a: "Yes. We offer monthly maintenance plans with backups, updates, and priority support." },
  { q: "What are your payment terms?", a: "Typically 50% upfront and 50% on delivery. We accept UPI, bank transfer, and cards." },
];

export const STATS = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Positive Reviews" },
  { value: 65, suffix: "%", label: "Repeat Clients" },
];