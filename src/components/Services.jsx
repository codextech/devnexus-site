"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { CodeIcon, GlobeIcon, Headset, SmartphoneIcon } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { TypewriterEffect } from "./ui/typewriter-effect";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCpu,
  IconCurrencyDollar,
  IconDatabase,
  IconEaseInOut,
  IconHeadset,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

const Services = () => {
  const words = [
    {
      text: "We ",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "offer",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "a",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "wide",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "range",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "of",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "services",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "to",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "meet",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "your",
      className: "text-neutral-500 dark:text-neutral-500",
    },
    {
      text: "needs.",
      className: "text-primary dark:text-primary",
    },
  ];

  const features = [
    {
      title: "Software Development",
      description:
        " We develop custom software tailored to your business needs.",
      icon: <IconTerminal2 className="text-primary h-5 w-5 relative z-50" />,
    },

    {
      title: "Web Development",
      description:
        "We build responsive and efficient websites using the latest technologies.",
      icon: (
        <GlobeIcon className="h-5 w-5 shrink-0 text-primary relative z-50" />
      ),
    },

    {
      title: "Database Management",
      description: "We ensure your data is secure and easily accessible.",
      icon: <IconDatabase className="text-primary h-5 w-5 relative z-50" />,
    },

    {
      title: "Cutting-Edge Technology",
      description:
        "We leverage the latest web technologies to craft high-performance, responsive websites that elevate your online presence and drive results.",
      icon: <IconCpu className="text-primary h-5 w-5 relative z-50" />,
    },
    {
      title: "Consulting",
      description:
        "We provide consulting services to help you improve your software and web application development processes.",
      icon: <IconHeadset className="text-primary h-5 w-5 relative z-50" />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp className="text-primary h-5 w-5 relative z-50" />,
    },
  ];
  return (
    <>
      <section
        id="services"
        className="bg-neutral-950 bg-dot-white/[0.2] relative w-full py-24 lg:py-44 scroll-m-12"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black bg-dot-mask"></div>

        <div className="container space-y-8 md:space-y-12 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <HoverBorderGradient
                containerClassName="rounded-full bg-transparent mx-auto"
                as="div"
                className="bg-transparent text-white flex items-center space-x-2 text-xs font-medium py-1"
                duration={0.8}
              >
                <span>Our Services</span>
              </HoverBorderGradient>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-web">
                What We Offer
              </h2>

              <div className="max-w-xl">
                <TypewriterEffect
                  className={
                    "text-neutral-100 text-base sm:text-xl md:text-2xl lg:text-2xl"
                  }
                  cursorClassName={"h-4 md:h-6 lg:h-6"}
                  words={words}
                />
              </div>

              {/* 
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We offer a wide range of services to meet your needs.
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  relative z-10 py-2 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l border-neutral-800",
        index < 3 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t lg:bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-2 sm:mb-4 px-10">
        <div className="relative z-10 w-fit">
          <div className="absolute inset-0 bg-primary/10 transform  rounded-md blur-lg" />
          <div className="h-10 w-10 rounded-2xl  backdrop-blur-sm flex items-center justify-center  bg-neutral-700 bg-grid-extrasmall-zinc-200  overflow-hidden">
            {/* <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 1024 1024"
              className="text-primary h-4 w-4 relative z-50"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M863.1 518.5H505.5V160.9c0-4.4-3.6-8-8-8h-26a398.57 398.57 0 0 0-282.5 117 397.47 397.47 0 0 0-85.6 127C82.6 446.2 72 498.5 72 552.5S82.6 658.7 103.4 708c20.1 47.5 48.9 90.3 85.6 127 36.7 36.7 79.4 65.5 127 85.6a396.64 396.64 0 0 0 155.6 31.5 398.57 398.57 0 0 0 282.5-117c36.7-36.7 65.5-79.4 85.6-127a396.64 396.64 0 0 0 31.5-155.6v-26c-.1-4.4-3.7-8-8.1-8zM951 463l-2.6-28.2c-8.5-92-49.3-178.8-115.1-244.3A398.5 398.5 0 0 0 588.4 75.6L560.1 73c-4.7-.4-8.7 3.2-8.7 7.9v383.7c0 4.4 3.6 8 8 8l383.6-1c4.7-.1 8.4-4 8-8.6z" />
            </svg> */}
            {icon}

            <div className="absolute inset-0 bg-neutral-600 [mask-image:linear-gradient(to_bottom,transparent,white_4rem,white_calc(100%-4rem),transparent)] z-40" />
          </div>
        </div>
      </div>

      {/* <div className="mb-2 sm:mb-4 relative z-10 px-10 text-neutral-400">
        {icon}
      </div> */}

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 md:max-w-[90%] lg:max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
