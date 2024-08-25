"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

export function NavbarForSmScreens() {
  //   const navItems = [
  //     {
  //       name: "Home",
  //       link: "/",
  //       icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  //     },
  //     {
  //       name: "About",
  //       link: "/about",
  //       icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  //     },
  //     {
  //       name: "Contact",
  //       link: "/contact",
  //       icon: (
  //         <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
  //       ),
  //     },
  //   ];

  const navItems = [
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Portfolio",
      link: "#portfolio",
    },
    {
      name: "Contact us",
      link: "#contact",
    },
  ];
  return (
    <div className="relative w-full sm:hidden">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
