"use client";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div>
        <div className="flex overflow-hidden justify-center items-center [mask-image:linear-gradient(to_right,transparent,black,black,transparent)]">
          <motion.div
            className="flex gap-20 w-max"
            animate={{ x: ["0%", "-66.666%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First set of logos */}
            <div className="flex gap-20 flex-none">
              <img
                src="/assets/logo-acme.png"
                alt="Acme Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-echo.png"
                alt="Echo Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-pulse.png"
                alt="Pulse Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-celestial.png"
                alt="Celestial Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-apex.png"
                alt="Apex Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-quantum.png"
                alt="Quantum Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex gap-20 flex-none">
              <img
                src="/assets/logo-acme.png"
                alt="Acme Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-echo.png"
                alt="Echo Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-pulse.png"
                alt="Pulse Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-celestial.png"
                alt="Celestial Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-apex.png"
                alt="Apex Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-quantum.png"
                alt="Quantum Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
            </div>
            {/* Third set for extra large screens */}
            <div className="flex gap-20 flex-none">
              <img
                src="/assets/logo-acme.png"
                alt="Acme Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-echo.png"
                alt="Echo Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-pulse.png"
                alt="Pulse Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-celestial.png"
                alt="Celestial Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-apex.png"
                alt="Apex Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
              <img
                src="/assets/logo-quantum.png"
                alt="Quantum Logo"
                className="h-8 w-auto lg:h-10 lg:w-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
