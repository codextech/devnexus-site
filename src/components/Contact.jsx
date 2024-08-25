"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";
import Link from "next/link";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div
      id="contact"
      className="w-full rounded-md bg-neutral-950 relative py-12 md:py-20 px-5 min-[450px]:px-8 antialiased scroll-m-5"
    >
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent backdrop-blur-[2px] relative z-10">
        <h2 className="text-3xl text-center font-web text-neutral-200">
          Contact Us
        </h2>

        <p className="text-sm mt-1 text-center text-neutral-300">
          We are always looking for ways to improve our products and services.
          Contact us and let us know how we can help you.
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Tyler Dane" type="text" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="example@gmail.com" type="email" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="Company Name">Company Name</Label>
              <Input id="Company Name" placeholder="Acme Inc" type="text" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here"
                type="text"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset]"
              type="submit"
            >
              Submit
              <BottomGradient />
            </button>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-8 mb-5 h-[1px] w-full" />

          <div className="flex flx-row flex-wrap justify-center items-center gap-3">
            <Link
              href={"#"}
              className="w-9 h-9 text-neutral-300 bg-transparent hover:bg-neutral-100/5 inline-flex justify-center items-center border border-neutral-700 rounded-md"
              type="submit"
            >
              <IconBrandGithub className="h-5 w-5 shrink-0" />
              <span className="sr-only">GitHub</span>
              <BottomGradient />
            </Link>

            <Link
              href={"#"}
              className="w-9 h-9 text-neutral-300 bg-transparent hover:bg-neutral-100/5 inline-flex justify-center items-center border border-neutral-700 rounded-md"
              type="submit"
            >
              <IconBrandLinkedin className="h-6 w-6 shrink-0" />
              <span className="sr-only">GitHub</span>
              <BottomGradient />
            </Link>

            <Link
              href={"#"}
              className="w-9 h-9 text-neutral-300 bg-transparent hover:bg-neutral-100/5 inline-flex justify-center items-center border border-neutral-700 rounded-md"
              type="submit"
            >
              <IconBrandInstagram className="h-6 w-6 shrink-0" />
              <span className="sr-only">GitHub</span>
              <BottomGradient />
            </Link>
          </div>

          {/* <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            
          </div> */}
        </form>
      </div>

      <BackgroundBeams />
    </div>
  );
};

export default Contact;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
