"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { FocusCards } from "@/components/ui/focus-cards";

const Portfolio = () => {
  const cards = [
    {
      title: "Tasleem Taxi",
      src: "/assets/portfolio/tasleemtaxi-portfolio.jpg",
      link: "https://www.tasleemtaxi.com/app/",
    },
    {
      title: "Cellular Optics",
      src: "/assets/portfolio/cellularoptics-portfolio.jpg",
      link: "https://cellularoptics.com/",
    },
    {
      title: "TTravel",
      src: "/assets/portfolio/ttravel-portfolio.png",
      link: "https://ttravell.com/",
    },
  ];

  return (
    <section id="portfolio" className="container py-24 pb-40">
      <div className="mb-8">
        <HoverBorderGradient
          containerClassName="rounded-full bg-transparent mx-auto mb-4"
          as="div"
          className="bg-transparent text-white flex items-center space-x-2 text-xs font-medium py-1"
          duration={0.8}
        >
          <span>Our Portfolio</span>
        </HoverBorderGradient>

        <h1 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl 2xl:text-5xl font-web mb-0.5">
          Our Previous Projects
        </h1>

        <p className="text-center text-base font-medium text-neutral-500">
          We have worked on a variety of projects.
        </p>
      </div>

      <FocusCards cards={cards} />
    </section>
  );
};

const PortfoliContent = [
  {
    link: "https://syspos.ae/",
    title: "Syspos",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
          fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
          nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
          occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
          officia sint labore. Tempor consectetur excepteur ut fugiat veniam
          commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    imgPath: "",
  },

  {
    link: "https://www.tasleemtaxi.com/app/",
    title: "Tasleem Taxi",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    imgPath: "",
  },

  {
    link: "https://cellularoptics.com/",
    title: "Cellular Optics",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    imgPath: "",
  },

  {
    link: "https://ttravell.com/",
    title: "TTravel",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    imgPath: "",
  },

  {
    link: "https://omooamweb-v2.netlify.app/en/tracking/period-calculator",
    title: "Omooma",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    imgPath: "",
  },
];

export default Portfolio;
