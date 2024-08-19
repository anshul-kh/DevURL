import { CardDataType, ItemType } from "./Sect_1";
import { Card_5, Card_6 } from "../minor/Cards";
import { Card } from "..";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

const cardData: CardDataType = [
  {
    ImageComp: Card_5,
    text: "Pre-Built Components",
  },
  {
    ImageComp: Card_6,
    text: "Showcase Your Stats",
  },
];

const Dev = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop && sectionElement) {
      gsap.fromTo(
        sectionElement,
        {
          y: 50,
          scale: 0.8,
        },
        {
          y: 0,
          scale: 1,
          duration: 1,
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
    <div className="w-full min-h-screen flex justify-center items-center px-1">
      <div
        ref={sectionRef}
        className="flex md:justify-center justify-start items-center flex-col gap-2 md:w-3/4 bg-black md:h-[90vh] md:mt-0 mt-10 md:mb-0 mb-10 md:py-0 py-10 rounded-3xl"
      >
        <h1 className="font-bold font-sans text-6xl text-anti-flash_white px-7 ">
          Special Features.
        </h1>
        <h1 className="font-bold font-sans text-5xl text-walnut_brown">
          For Devs.
        </h1>
        <div className="flex md:flex-row flex-col md:flex-wrap gap-x-10 justify-center items-center gap-y-7 mt-10 w-full">
          {cardData.map((item: ItemType, index: number) => (
            <Card
              key={index}
              ImageComp={item.ImageComp}
              cardStyle="border-anti-flash_white-700  border-1 border bg-anti-flash_white-700 shadow-lg shadow-anti-flash_white-100  w-3/4"
              textStyle=""
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dev;
