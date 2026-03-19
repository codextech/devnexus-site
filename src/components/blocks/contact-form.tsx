"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";
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
  "w-full px-4 py-3 rounded-xl contact-input",
  "text-sm",
  "focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/30",
  "transition-all duration-200"
);

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

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold contact-form-title">
          Message sent!
        </h3>
        <p className="mt-2 text-sm contact-form-sub max-w-sm mx-auto">
          We&rsquo;ll get back to you within 24 hours with a plan.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClasses}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
            Company *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className={inputClasses}
            placeholder="Your company"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={inputClasses}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
          Service
        </label>
        <select
          id="service"
          name="service"
          className={cn(inputClasses, "appearance-none")}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold contact-label mb-2 uppercase tracking-wide">
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={cn(inputClasses, "resize-none")}
          placeholder="What are you looking to build? What problem are you solving?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-blue text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
