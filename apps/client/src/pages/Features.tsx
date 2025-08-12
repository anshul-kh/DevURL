import { Feature, Footer } from "../components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import DefaultLayout from "../layout/default";

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
    <DefaultLayout className="h-full w-full  overflow-x-hidden no-scrollbar bg-flash_white flex flex-col justify-start items-center gap-10">
      <div
        ref={textRef}
        className="md:text-7xl text-3xl text-center font-bold text-decoration-none no-underline"
      >
        What's For Dev
      </div>

      <Feature />

      <Footer/>
    </DefaultLayout>
  );
};

export default Features;
