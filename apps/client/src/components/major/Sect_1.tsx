import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageCard } from "../minor/Cards";
import { Card } from "..";
import { Card_SVG_1, Card_SVG_2, Card_SVG_3, Card_SVG_4 } from "../../assets";
gsap.registerPlugin(ScrollTrigger);

export type ItemType = {
  ImageComp: React.ReactElement;
  text: string;
};

export type CardDataType = ItemType[];

const cardData: CardDataType = [
  {
    ImageComp: <ImageCard src={Card_SVG_1} style="h-3/4" />,
    text: "Awesome Developer Profile",
  },
  {
    ImageComp: <ImageCard src={Card_SVG_2} style="w-9/12 h-2/4" />,
    text: "Custom Messages",
  },
  {
    ImageComp: <ImageCard src={Card_SVG_3} style="w-9/12 h-2/4" />,
    text: "Showcase Your Skills",
  },
  {
    ImageComp: <ImageCard src={Card_SVG_4} style="w-9/12 h-2/4" />,
    text: "Showcase Your GitHub",
  },
];

const Sect_1 = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop) {
      gsap.fromTo(
        cardsRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current[0]?.parentElement, // container of cards
            start: "top 75%",
            end: "bottom 60%",
            scroller: "#scroll-container",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="w-full min-h-fit flex justify-center items-start">
      <div className="flex md:justify-center justify-start items-center flex-col gap-2">
        <h1 className="font-bold text-6xl text-black px-7">
          Awesome Features.
        </h1>
        <h1 className="font-bold text-5xl text-walnut_brown">
          Always, Free.
        </h1>
        <div className="flex md:flex-row flex-col md:flex-wrap gap-x-10 justify-center items-center gap-y-7 mt-10 w-3/4">
          {cardData.map((item: ItemType, index: number) => (
            <div
              key={`card-${index}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <Card
                ImageComp={item.ImageComp}
                cardStyle="bg-anti-flash_white-700"
                textStyle=""
                text={item.text}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sect_1;
