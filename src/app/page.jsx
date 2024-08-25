"use client";
import Image from "next/image";
import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import TestimonialLogos from "@/components/TestimonialLogos";

export default function Home() {
  return (
    <>
      <Hero />
      <TestimonialLogos />
      <Services />
      {/* <Portfolio /> */}
      <Portfolio />
      <Contact />
    </>
  );
}
