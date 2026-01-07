"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="px-5">
        <div className="max-w-[540px] mx-auto lg:max-w-[800px]">
          <div className="flex justify-center">
            <div className="text-sm lg:text-lg inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Boost your productivity
            </div>
          </div>
          <h2 className="text-center text-4xl md:text-[54px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            A more effective way to track tasks, projects, team and progress
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-4">
            Effortlessly track your progress with our intuitive platform. Set
            projects, tasks, collaborate with team members, and stay motivated
            on your journey to success.
          </p>
        </div>
        <div className="relative">
          <img
            src="/assets/product-image.png"
            alt="Product Showcase"
            className="md:w-[1200px] lg:w-[1500px] h-auto mt-10 mx-auto rounded-2xl"
          />
          <motion.img
            src="/assets/pyramid.png"
            alt="Pyramid Image"
            height={262}
            width={262}
            className="absolute md:-right-36 md:-top-32 hidden md:block lg:right-40 lg:-top-10"
            style={{ translateY }}
          />
          <motion.img
            src="/assets/tube.png"
            alt="Tube Image"
            height={248}
            width={248}
            className="absolute md:-left-36 md:bottom-24 lg:left-40 lg:bottom-10 hidden md:block"
            style={{ translateY }}
          />
        </div>
      </div>
    </section>
  );
};
