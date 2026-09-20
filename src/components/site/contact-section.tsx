import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Instagram, Github, Send, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/site/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(20),
  service: z.string().min(1, "Please select the service required"),
  details: z.string().trim().min(10, "Tell us a bit more about your project").max(1000),
  budget: z.string().max(40).optional().or(z.literal("")),
});

const DETAILS = [
  { Icon: Mail, label: "Email", value: "sorafs.work@gmail.com", href: "mailto:sorafs.work@gmail.com" },
  { Icon: Phone, label: "Phone", value: "+91 9500282415", href: "tel:+919500282415" },
  { Icon: MessageCircle, label: "WhatsApp", value: "+91 7397732494", href: "https://wa.me/917397732494" },
  { Icon: Instagram, label: "Instagram", value: "@sora.official.id", href: "https://instagram.com/sora.official.id" },
  { Icon: Github, label: "GitHub", value: "sorafswork", href: "https://github.com/sorafswork" },
];

const SERVICES_LIST = [
  "Website Development",
  "Graphic Design",
  "Brand Identity",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "UI/UX Design",
  "Social Media",
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", details: "", budget: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      toast.error(res.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setSent(true);
    toast.success("Enquiry received! We'll be in touch within 24 hours.");
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="Contact"
        title={<>Send us your <span className="text-shimmer">project enquiry</span></>}
        subtitle="Share your requirements and our team will respond within 24 hours."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-3xl border p-6 md:p-8">
          <h3 className="font-display text-xl font-bold">Business details</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            SoRa Innovative Solution — working remotely with clients worldwide.
          </p>
          <ul className="mt-6 space-y-3">
            {DETAILS.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 hover:border-primary/60 transition-colors"
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

        <div className="glass-card rounded-3xl border p-6 md:p-8">
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
                <h3 className="mt-4 font-display text-2xl font-bold">Enquiry received!</h3>
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
                className="grid gap-4 sm:grid-cols-2"
              >
                <Field label="Full Name">
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" maxLength={80} />
                </Field>
                <Field label="Email Address">
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" maxLength={120} />
                </Field>
                <Field label="Phone Number">
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9500282415" maxLength={20} />
                </Field>
                <Field label="Service Required">
                  <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                    <SelectTrigger><SelectValue placeholder="Pick a service" /></SelectTrigger>
                    <SelectContent>
                      {SERVICES_LIST.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Project Details" className="sm:col-span-2">
                  <Textarea rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Tell us about your project, goals, and any references." maxLength={1000} />
                </Field>
                <Field label="Budget (Optional)" className="sm:col-span-2">
                  <Input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. ₹50,000 — optional" maxLength={40} />
                </Field>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-blue"
                >
                  Submit Enquiry <Send className="h-4 w-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
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