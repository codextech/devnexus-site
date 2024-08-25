import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const pagesItems = [
    {
      name: "Home",
      href: "/",
    },

    {
      name: "Services",
      href: "#services",
    },

    {
      name: "Portfolio",
      href: "#portfolio",
    },

    {
      name: "Contact us",
      href: "#contact",
    },
  ];

  const socialItems = [
    {
      name: "Linked In",
      href: "https://www.linkedin.com/company/devnexusconsulting",
    },

    // {
    //   name: "Twitter",
    //   href: "/",
    // },

    {
      name: "Instagram",
      href: "/",
    },
  ];

  const legalItems = [
    {
      name: "Terms & Services",
      href: "/",
    },

    {
      name: "Privacy Policy",
      href: "/",
    },
  ];

  return (
    <div className="border-t border-white/[0.1] px-8 py-20 bg-neutral-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex md:flex-row flex-col justify-between items-start gap-x-10 lg:px-8">
        <div>
          <Link className="mb-4" href="/">
            <Image
              src="/assets/logo-word.svg"
              alt="logo"
              loading="lazy"
              width={300}
              height={200}
              className="h-auto"
            />
          </Link>
          <div className="mt-2 ml-3">
            © copyright DevNexus 2024. All rights reserved.
          </div>
        </div>

        <div className="grid grid-cols-2 min-[550px]:grid-cols-3 gap-10 md:gap-5 lg:gap-16 items-start mt-10 md:mt-0">
          <div className="flex justify-center space-y-4 flex-col w-full">
            <p className="text-neutral-300 font-bold">Pages</p>

            <ul className="list-none space-y-4">
              {pagesItems.map((item, index) => (
                <li className="list-none" key={index}>
                  <Link
                    href={item.href}
                    className="transition-colors font-normal text-neutral-200 hover:text-text-neutral-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center space-y-4 flex-col w-full">
            <p className="text-neutral-300 font-bold">Socials</p>

            <ul className="list-none space-y-4">
              {socialItems.map((item, index) => (
                <li className="list-none" key={index}>
                  <Link
                    href={item.href}
                    className="transition-colors font-normal text-neutral-200 hover:text-text-neutral-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="flex justify-center space-y-4 flex-col w-full">
            <p className="text-neutral-300 font-bold">Legal</p>

            <ul className="list-none space-y-4">
              {legalItems.map((item, index) => (
                <li className="list-none" key={index}>
                  <Link
                    href={item.href}
                    className="transition-colors font-normal text-neutral-200 hover:text-text-neutral-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
