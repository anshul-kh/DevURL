import React, { useEffect, useRef } from "react";
import { Free, Drag, Stats_1, Stats_2, View } from "../../assets";
import FeatureCard from "../minor/FeatureCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const list = [
  {
    title: "Show Case Stats",
    desc: "Providing Customizable widgets to show case the metrics that matter most to your coding efforts",
    svg: Stats_1,
  },
  {
    title: "Free For Dev",
    desc: "Keeping Platform Always free And Without Ads for everyone",
    svg: Free,
  },
  {
    title: "Show The Progress",
    desc: "Your Mini-Portfolio to showcase the progress",
    svg: Stats_2,
  },
  {
    title: "Customizable View",
    desc: "Customizable Components for your need",
    svg: View,
  },
  {
    title: "Drag And Drop UI",
    desc: "Just Drag and Drop The Components",
    svg: Drag,
  },
];

const Feature: React.FC = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    gsap.fromTo(
      sectionElement,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
    );

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((instance) => instance.kill());
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex md:w-4/6 w-5/6 flex-wrap   gap-3">
      {list.map((item, index) => (
        <FeatureCard key={index}>
          <div className="flex flex-col justify-center items-center flex-wrap  md:w-2/4  gap-2">
            <p className="md:text-2xl font-bold">{item.title}</p>
            <p className="md:text-xl text-sm text-center">{item.desc}</p>
          </div>
          <img
            src={item.svg}
            alt={item.title}
            className="w-[100px] h-[170px] "
          />
        </FeatureCard>
      ))}
    </div>
  );
};

export default Feature;
