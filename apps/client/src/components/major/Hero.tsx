import React, { useState, useRef, useEffect } from "react";
import { Hero_1, Hero_2 } from "../../assets";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Hero: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const heroRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textMinRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (
      image1Ref.current &&
      image2Ref.current &&
      textRef.current &&
      inputRef.current &&
      buttonRef.current
    ) {
      gsap.fromTo(
        image1Ref.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1 },
      );
      gsap.fromTo(
        image2Ref.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5, zIndex: 10 },
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 1 },
      );
      gsap.fromTo(
        textMinRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 1 },
      );
      gsap.fromTo(
        inputRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 1.5 },
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 2 },
      );
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 1, scale: 1, y: 0 },
      {
        opacity: 0,
        duration: 2,
        ease: "power3.inOut",
        scale: 0.7,
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 10% ",
          scroller: "#scroll-container",
          end: "bottom center",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="flex md:flex-row z-20 flex-col justify-center items-center h-full md:h-[85vh] md:py-0 py-14"
    >
      <img
        ref={image1Ref}
        src={Hero_1}
        className="hidden md:flex rotate-[5deg] z-10 h-[50vh]"
        alt="hero"
      />

      <div className="flex justify-center items-center flex-col md:w-2/6 gap-10 ">
        <h1
          ref={textRef}
          className="text-black font-bold text-6xl flex justify-center items-center px-7"
        >
          Create Your Developer Profile In Seconds
        </h1>

        <div className="flex justify-start items-center w-full px-7">
          <input
            ref={inputRef}
            type="text"
            className="w-9/12 outline-none h-14 rounded-xl px-7"
            placeholder="Select Your Url Here"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Link
            ref={buttonRef}
            className="w-2/12 h-14 rounded flex justify-center items-center text-anti-flash_white-700 bg-black"
            to={`/auth/signup?username=${username}`}
          >
            SUBMIT
          </Link>
        </div>

        <h1 ref={textMinRef}>It's free and easy to use</h1>
      </div>

      <img
        ref={image2Ref}
        src={Hero_2}
        className="-rotate-[5deg] z-10 md:h-[50vh] md:w-auto w-11/12"
        alt="hero"
      />
    </div>
  );
};

export default Hero;
