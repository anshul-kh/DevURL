import { useEffect, useRef } from "react";
import { Free, Drag, Stats_1, Stats_2, View } from "../../assets";
import FeatureCard from "../minor/FeatureCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const list = [
  {
    title: "Show Case Stats",
    desc: "Providing customizable widgets to showcase the metrics that matter most to your coding efforts",
    svg: Stats_1,
  },
  {
    title: "Free For Dev",
    desc: "Keeping the platform always free and without ads for everyone",
    svg: Free,
  },
  {
    title: "Show The Progress",
    desc: "Your mini-portfolio to showcase the progress",
    svg: Stats_2,
  },
  {
    title: "Customizable View",
    desc: "Customizable components for your needs",
    svg: View,
  },
  {
    title: "Drag And Drop UI",
    desc: "Just drag and drop the components",
    svg: Drag,
  },
];

const Feature: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
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
          trigger: cardsRef.current[0]?.parentElement, // container div
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 md:w-4/6 w-5/6 mx-auto">
      {list.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <FeatureCard className="flex flex-col gap-4 items-center justify-between h-full p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-lg md:text-2xl font-bold">{item.title}</p>
              <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
            </div>
            <img
              src={item.svg}
              alt={item.title}
              className="w-20 h-20 md:w-28 md:h-28 object-contain mt-4"
            />
          </FeatureCard>
        </div>
      ))}
    </div>
  );
};

export default Feature;