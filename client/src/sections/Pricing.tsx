"use client"
import { Check } from 'lucide-react'
import {twMerge} from 'tailwind-merge'
import { motion } from 'framer-motion'
import { SignUpButton } from "@clerk/clerk-react";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 19,
    buttonText: "Coming Soon",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 39,
    buttonText: "Coming Soon",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 overflow-x-clip px-10">
      <div className='max-w-[540px] mx-auto'>
        <h2 className="text-center text-4xl md:text-[54px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">Pricing</h2>
        <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E]">Free forever. Upgrade for unlimited tasks, better collaboration, and more exclusive features.</p>
        </div>
        <div className='flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center'>
          {pricingTiers.map(({title, monthlyPrice, buttonText, popular,inverse, features}) => (
            <div key={title} className={twMerge('p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] max-w-sm w-full', inverse && 'border-black bg-blue-950 text-white')}>
              <div className='flex justify-between'>
              <h3 className={twMerge('text-lg font-bold text-black/50', inverse && 'text-white/60')}>{title}</h3>
              {popular === true  && (
                <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
              <motion.span 
              animate={{
                backgroundPositionX:"-100%"
              }}
              transition={{
                duration:1,
                repeat:Infinity,
                ease:"linear",
                repeatType:"loop"
              }}
              className='bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDf,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-'>Popular</motion.span></div>
              )}
              </div>
              <div className='flex items-baseline gap-1 mt-[30px]'>
                <span className='text-4xl font-bold tracking-tighter leading-none'>${monthlyPrice}</span>
                <span className={twMerge('tracking-tight font-bold text-black/50', inverse && 'text-white/60')}>/month</span>
                </div>
                {title === "Free" ? (
                  <SignUpButton mode="modal">
                    <button className={twMerge('w-full bg-blue-950 text-white px-4 py-2 rounded-lg cursor-pointer mt-[30px]', inverse && 'bg-white text-black')}>
                      {buttonText}
                    </button>
                  </SignUpButton>
                ) : (
                  <button 
                    className={twMerge('w-full bg-black text-white px-4 py-2 rounded-lg mt-[30px] opacity-50 cursor-not-allowed', inverse && 'bg-white text-black')} 
                    disabled
                  >
                    {buttonText}
                  </button>
                )}
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature) => (
                    <li className="text-sm flex items-center gap-4" key={feature}>
                      <Check className='h-5 w-5'/>
                      <span>{feature}</span>
                      </li>
                  ))}
                </ul>
            </div>
          ))}
        </div>
    </section>
  )
};
