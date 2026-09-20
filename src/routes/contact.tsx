import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Instagram, Github, MapPin, Send, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SoRa Innovative Solutions" },
      { name: "description", content: "Get in touch with SoRa Innovative Solutions — email, phone, WhatsApp, or send a project brief." },
      { property: "og:title", content: "Contact SoRa Innovative Solutions" },
      { property: "og:description", content: "Start your project or say hello." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().optional().or(z.literal("")),
  timeline: z.string().min(1, "Pick a timeline"),
  details: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const CONTACTS = [
  { Icon: Mail, label: "Email", value: "sorafs.work@gmail.com", href: "mailto:sorafs.work@gmail.com" },
  { Icon: Phone, label: "Phone", value: "+91 9500282415", href: "tel:+919500282415" },
  { Icon: MessageCircle, label: "WhatsApp", value: "+91 7397732494", href: "https://wa.me/917397732494" },
  { Icon: Instagram, label: "Instagram", value: "@sora.official.id", href: "https://instagram.com/sora.official.id" },
  { Icon: Github, label: "GitHub", value: "sorafswork", href: "https://github.com/sorafswork" },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "",
    service: "", budget: "", timeline: "", details: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const first = res.error.issues[0];
      toast.error(first?.message ?? "Please check your inputs");
      return;
    }
    setSent(true);
    toast.success("Message received! We'll be in touch within 24 hours.");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build something <span className="text-gradient-brand">amazing</span> together.</>}
        subtitle="Share your project details and we'll respond within 24 hours."
      />
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="glass-card rounded-3xl border p-6">
              <h3 className="font-display text-xl font-bold">Business info</h3>
              <ul className="mt-4 space-y-3">
                {CONTACTS.map(({ Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 hover:border-primary/60 transition-colors"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground mx-auto">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-display font-semibold">Working remotely — worldwide</p>
                  <p className="text-xs text-muted-foreground mt-1">Available across every timezone</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl border p-6 md:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow-blue"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-2xl font-bold">Message received!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks {form.name || "there"} — we'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  className="grid gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name">
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" maxLength={80} />
                    </Field>
                    <Field label="Business Name">
                      <Input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Acme Inc." maxLength={80} />
                    </Field>
                    <Field label="Email">
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" maxLength={120} />
                    </Field>
                    <Field label="Phone">
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9500282415" maxLength={20} />
                    </Field>
                    <Field label="Service">
                      <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                        <SelectTrigger><SelectValue placeholder="Pick a service" /></SelectTrigger>
                        <SelectContent>
                          {["Website Development","Graphic Design","Brand Identity","Content Writing","Digital Marketing","SEO","UI/UX Design","Social Media"].map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Budget (Optional)">
                      <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                        <SelectTrigger><SelectValue placeholder="Pick a range" /></SelectTrigger>
                        <SelectContent>
                          {["< ₹25k","₹25k – ₹75k","₹75k – ₹2L","₹2L+"].map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Timeline" className="sm:col-span-2">
                      <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                        <SelectTrigger><SelectValue placeholder="When do you need it?" /></SelectTrigger>
                        <SelectContent>
                          {["ASAP","1–2 weeks","1 month","2–3 months","Flexible"].map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Project Details" className="sm:col-span-2">
                      <Textarea rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Tell us about your project, goals, and any references." maxLength={1000} />
                    </Field>
                  </div>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-blue"
                  >
                    Send Message <Send className="h-4 w-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}