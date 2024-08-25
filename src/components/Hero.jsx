import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero = () => {
  const words = `We build innovative software and web applications that helps and drive growth for your business.`;
  return (
    <div>
      <LampContainer className={"min-h-fit h-[80dvh] px-4 md:px-8"}>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 1,
            ease: "easeInOut",
          }}
          className="py-4 text-center"
        >
          <div className="text-3xl sm:text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-br from-slate-100 to-slate-400/80  bg-clip-text text-transparent ">
              Welcome to
            </span>{" "}
            <span className="text-white font-web">
              DevNe<span className="text-[#02A9F7]">x</span>us
            </span>
            {/* <span className="text-white font-web">
              <sapn className="text-[#02A9F7]">D</sapn>ev
              <sapn className="text-[#02A9F7]">N</sapn>exus
            </span> */}
          </div>

          <div className="max-w-xs md:max-w-lg mx-auto">
            <TextGenerateEffect
              duration={1}
              words={words}
              className={"font-medium"}
            />
          </div>

          {/* <div className="bg-gradient-to-br from-slate-100 to-slate-400 text-sm sm:text-basic bg-clip-text text-transparent max-w-xs md:max-w-lg mx-auto">
            We build innovative software and web applications that helps and
            drive growth for your business.
          </div> */}
        </motion.h1>

        {/* Radial gradient for the container to give a faded look */}
      </LampContainer>
    </div>
  );
};

export default Hero;
