import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import DefaultLayout from "../layout/default";
import { Footer } from "../components";

const list = [
  "Open Source Project",
  "Inspired By Bio.Link",
  "Built for Dev",
  "A Free Platform",
  "It's Secure",
  "No Personal Record Like Phone Number asked or tracked or shared",
  "Hashed Password",
  "No Irritable Emails",
  "Tokenized Sessions",
];

const About: React.FC = () => {
  const pillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      pillsRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08, // delays each pill slightly
      }
    );
  }, []);

  return (
    <DefaultLayout className="min-h-screen w-full flex justify-between no-scollbar items-center flex-col bg-flash_white text-black gap-16">
      {/* Title */}
      <div className="md:text-6xl text-3xl text-center font-bold">
        Something About DevURL
      </div>

      {/* Pills */}
      <div className="flex md:w-4/6 w-5/6 flex-wrap gap-4 justify-center">
        {list.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) pillsRef.current[index] = el;
            }}
            className="px-6 py-3 min-h-[3rem] flex items-center justify-center 
                       rounded-full text-black border border-cadet_gray-800 shadow-md
                       hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer select-none"
          >
            <p className="md:text-lg text-base font-medium text-center">{item}</p>
          </div>
        ))}
      </div>

      <Footer/>
    </DefaultLayout>
  );
};

export default About;
