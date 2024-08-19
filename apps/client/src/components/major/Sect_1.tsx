import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card_1, Card_2, Card_3, Card_4 } from "../minor/Cards";
import { Card } from "..";
gsap.registerPlugin(ScrollTrigger);

export type ItemType = {
  ImageComp: React.FC;
  text: string;
};

export type CardDataType = ItemType[];

const cardData: CardDataType = [
  {
    ImageComp: Card_1,
    text: "Awesome Developer Profile",
  },
  {
    ImageComp: Card_2,
    text: "Custom Messages",
  },
  {
    ImageComp: Card_3,
    text: "Showcase Your Skills",
  },
  {
    ImageComp: Card_4,
    text: "Showcase Your GitHub",
  },
];

const Sect_1 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop && sectionElement) {
      gsap.fromTo(
        sectionElement,
        {
          y: 100,
          scale: 0.8,
        },
        {
          y: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.5,
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 50%",
            scroller: "#scroll-container",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((instance) => instance.kill());
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-fit flex justify-center items-start"
    >
      <div className="flex md:justify-center justify-start items-center flex-col gap-2">
        <h1 className="font-bold font-sans text-6xl text-black px-7">
          Awesome Features.
        </h1>
        <h1 className="font-bold font-sans text-5xl text-walnut_brown">
          Always, Free.
        </h1>
        <div className="flex md:flex-row flex-col md:flex-wrap gap-x-10 justify-center items-center gap-y-7 mt-10 w-3/4">
          {cardData.map((item: ItemType, index: number) => (
            <Card
              key={index}
              ImageComp={item.ImageComp}
              cardStyle="bg-anti-flash_white-700"
              textStyle=""
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sect_1;
