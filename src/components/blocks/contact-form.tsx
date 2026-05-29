"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const N8N_FORM_URL = "https://n8n.devnexus.co/webhook/5598b86a-9fdd-4f42-b7a6-40909fab7a7a";

const serviceOptions = [
  "Web & Mobile Development",
  "AI Solutions",
  "Agentic AI Workflows",
  "Voice AI Agents",
  "Jira Apps & Integrations",
  "Not sure yet",
];

const inputClasses = cn(
  "w-full rounded-[10px] border border-border bg-surface-2 px-4 py-3 text-sm text-fg",
  "placeholder:text-fg-faint",
  "transition-colors duration-200",
  "focus:border-blue/50 focus:outline-none focus:ring-2 focus:ring-blue/15",
);

const labelClasses =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      Name: (formData.get("name") as string) ?? "",
      Email: (formData.get("email") as string) ?? "",
      "Company Name": (formData.get("company") as string) ?? "",
      "Business Contact Number": (formData.get("phone") as string) ?? "",
      "Tell us about your project": (formData.get("message") as string) ?? "",
      "Service interested in": (formData.get("service") as string) ?? "",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(N8N_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="py-16 text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle className="h-7 w-7 text-emerald-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-fg md:text-2xl">Message sent!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">
          We&rsquo;ll get back to you within 24 hours with a plan.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name *</label>
          <input type="text" id="name" name="name" required className={inputClasses} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email *</label>
          <input type="email" id="email" name="email" required className={inputClasses} placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClasses}>Company *</label>
          <input type="text" id="company" name="company" required className={inputClasses} placeholder="Your company" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone *</label>
          <input type="tel" id="phone" name="phone" required className={inputClasses} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClasses}>Service</label>
        <select id="service" name="service" className={cn(inputClasses, "appearance-none")} defaultValue="">
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Project details *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={cn(inputClasses, "resize-none")}
          placeholder="What are you looking to build? What problem are you solving?"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      ) : null}

      <Button type="submit" size="lg" variant="primary" disabled={status === "loading"} className="group">
        {status === "loading" ? "Sending..." : "Send message"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
