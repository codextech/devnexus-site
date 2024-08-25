"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const navigationContent = [
    {
      label: "Services",
      href: "#services",
    },
    {
      label: "Portfolio",
      href: "#portfolio",
    },
    {
      label: "Contact us",
      href: "#contact",
    },
  ];

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos && currentScrollPos > 70) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div
      className={`sticky top-0 z-20 transition-transform w-full py-3 border-b bg-neutral-950 border-white/10 ${
        visible
          ? "sm:translate-y-[0px] duration-500"
          : "sm:-translate-y-[150px] duration-1000"
      }`}
    >
      <div className="container md:px-8">
        <div className="flex flex-nowrap items-center justify-center sm:justify-between gap-5">
          {/* <Image
            src={"/assets/logo-word.png"}
            width={70}
            height={100}
            alt="Logo"
            className="h-auto"
          /> */}

          <Image
            src="/assets/logo-word.svg"
            alt="logo"
            loading="lazy"
            width={300}
            height={200}
            className="h-auto"
          />

          <div className="hidden sm:flex flex-nowrap items-center justify-between gap-6 ">
            {navigationContent.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-neutral-200 transition-colors duration-200 navigation-link-hover-animation hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
