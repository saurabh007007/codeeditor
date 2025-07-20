"use client";

import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export function MainPage() {
  return (
    <div className="flex flex-col overflow-hidden mt-[-4rem] bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <ContainerScroll
        titleComponent={
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-black dark:text-white leading-snug">
              Bhai DSA ker le <br/>backchodi se ghar nahi chalta
            </h1>
            <h2 className="text-4xl md:text-[5.5rem] font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 leading-none">
              Ab to platform bhi ban gaya!
            </h2>
            <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Start your DSA journey now, sharpen your skills, and get ready to crack the top tech jobs.
            </p>

            <div className="mt-8 flex justify-center">
              <Button className="text-lg px-6 py-3">
               <Link to="/home"> 🚀 Get Started Now</Link>
              </Button>
            </div>
          </div>
        }
      >
        <img
          src="/image.jpg"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top shadow-xl"
          draggable={false}
          loading="lazy"
        />
      </ContainerScroll>

      <div className="mt-10 flex justify-center">
        <ArrowDown className="animate-bounce text-gray-500 dark:text-gray-300" size={32} />
      </div>
    </div>
  );
}
