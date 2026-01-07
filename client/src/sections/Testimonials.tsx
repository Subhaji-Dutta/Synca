"use client"
import { motion } from 'framer-motion'

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: "/assets/avatar-1.png",
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: "/assets/avatar-2.png",
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: "/assets/avatar-3.png",
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: "/assets/avatar-4.png",
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: "/assets/avatar-5.png",
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: "/assets/avatar-6.png",
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: "/assets/avatar-7.png",
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: "/assets/avatar-8.png",
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: "/assets/avatar-9.png",
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn=testimonials.slice(0,3)
const secondColumn=testimonials.slice(3,6)
const thirdColumn=testimonials.slice(6,9)


export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="px-10">
        <div className="flex justify-center">
        <div className="text-sm lg:text-lg inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Testimonials</div>
        </div>
        <h2 className="text-center text-4xl md:text-[54px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">What our users say</h2>
        <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E]">From intuitive design to powerful features, our app has become an essential tool for users around the world.</p>
        <div className="flex justify-center gap-6 overflow-hidden">
          {/* First Column - Down to Up */}
          <div className="flex flex-col gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)] h-[800px]">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {/* First set of testimonials */}
               {firstColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={index} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {firstColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={`duplicate-${index}`} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>

          {/* Second Column - Up to Down */}
          <div className="hidden md:block">
            <div className="flex flex-col gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] h-[800px]">
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ["-50%", "0%"] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {/* First set of testimonials */}
                {secondColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={index} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {secondColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={`duplicate-${index}`} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Third Column - Down to Up */}
          <div className="hidden lg:block">
            <div className="flex flex-col gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)] h-[800px]">
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {/* First set of testimonials */}
                {thirdColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={index} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {thirdColumn.map(({text, imageSrc, name, username}, index) => (
                  <div key={`duplicate-${index}`} className='p-10 rounded-3xl border border-[#222222]/10 [box-shadow:rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] max-w-sm w-full'>
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full" />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>{name}</div>
                        <div className='text-[#222222]/50 tracking-tight leading-5'>{username}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};
