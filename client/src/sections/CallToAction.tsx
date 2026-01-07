"use client";
import { MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SignedOut, SignedIn, SignUpButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'

export const CallToAction = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="px-10">
        <div className="relative md:max-w-[540px] lg:max-w-[650px] mx-auto">
          <h2 className="text-center text-4xl md:text-[54px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Sign up for free today
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-4">
            Celebrate the joy of tracking the projects for your organization
            task progression.
          </p>
          <motion.img
            src="/assets/star.png"
            alt="Star image"
            width={360}
            className="hidden md:block absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src="/assets/spring.png"
            alt="Spring image"
            width={360}
            className="hidden md:block absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="flex justify-center gap-2 mt-10">
          <SignedOut>
            <SignUpButton mode="modal">
          <button className="bg-blue-950 text-white px-4 py-2 rounded-lg cursor-pointer">
            Get for Free
          </button>
          </SignUpButton>
          </SignedOut>
          <SignedIn>
            <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
            Dashboard
          </button>
          </SignedIn>
          <button className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-1">
            <span>Learn More</span> <MoveRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
