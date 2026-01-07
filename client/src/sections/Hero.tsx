"use client";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const heroRef=useRef(null)
  const {scrollYProgress} = useScroll({
    target:heroRef,
    offset:["start end", "end start"]
  })
  const translateY=useTransform(scrollYProgress, [0, 1], [150, -150])
  return (
    <section ref={heroRef} className="pt-8 pb-20 md:pt-5 md:pb-10 lg:px-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="px-5">
        <div className="md:flex items-center">
          <div className="md:w-[478px] lg:w-[900px]">
            {/* <div className="text-sm lg:text-lg inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Version 1.0 is here
            </div> */}
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
              Pathway to productivity
            </h1>
            <p className="text-xl lg:text-2xl text-[#010D3E] tracking-tight mt-4 lg:w-[700px]">
              Celebrate the joy of accomplisment with an app designed to track
              your progress, motivate your efforts and celebrate your successes.
            </p>
            <div className="flex gap-2 items-center mt-[30px]">
              <SignedIn>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-blue-950 text-white px-4 py-2 rounded-lg cursor-pointer">
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>
              <button className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-1">
                <span>Learn More</span> <MoveRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] lg:h-[800px] md:flex-1 relative">
            <motion.img
              src="/assets/cog.png"
              alt="Cog image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg-right-[100px]"
              animate={{
                translateY:[-30,30],
              }}
              transition={{
                repeat:Infinity,
                duration:4,
                repeatType:"mirror",
                ease:"easeInOut"
              }}
            />
            <motion.img
              src="/assets/cylinder.png"
              alt="Cylinder image"
              width={220}
              height={220}
              className="hidden md:block -top-8 -left-32 lg:h-[300px] lg:w-[300px] md:absolute lg-right-[100px]"
              style={{translateY: translateY}}
            />
            <motion.img
              src="/assets/noodle.png"
              alt="Noodle image"
              width={220}
              className="hidden lg:block absolute top-[620px] left-[600px]"
              style={{translateY: translateY, rotate:30}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
