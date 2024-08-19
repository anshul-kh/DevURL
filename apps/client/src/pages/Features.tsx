import { NavBar, Feature } from "../components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

const Features = () => {
  const textRef = React.useRef(null);
  const copyRef = React.useRef(null);
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0.8,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
    );

    gsap.fromTo(
      copyRef.current,
      {
        opacity: 0.8,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
      },
    );

    // Clean up function to kill ScrollTrigger instances
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((instance) => instance.kill());
      }
    };
  }, []);

  return (
    <div className="h-full w-full bg-black flex flex-col justify-start items-center gap-10">
      <NavBar />

      <div
        ref={textRef}
        className="md:text-7xl text-3xl text-center border-b border-[#fff] text-[#fff] font-bold"
      >
        What's For Dev
      </div>

      <Feature />

      <div
        ref={copyRef}
        className="text-white flex w-full h-16 justify-center items-center text-xl"
      >
        @Copyright DevURL
      </div>
    </div>
  );
};

export default Features;
