"use client";

import { useState } from "react";
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
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-dark-800/50",
  "text-white placeholder:text-dark-500",
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
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-white">
          Thanks for reaching out!
        </h3>
        <p className="mt-2 text-dark-400">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
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
          <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark-300 mb-2">
            Company Name *
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
          <label htmlFor="phone" className="block text-sm font-medium text-dark-300 mb-2">
            Business Contact Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={inputClasses}
            placeholder="e.g. 03249429698"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-dark-300 mb-2">
          Service interested in
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
        <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputClasses, "resize-none")}
          placeholder="What are you looking to build? What problem are you solving?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
