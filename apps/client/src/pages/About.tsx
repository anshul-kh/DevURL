import React from "react";
import { NavBar, FeatureCard } from "../components";

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
  return (
    <div className="min-h-screen w-full flex justify-start items-center  flex-col bg-black gap-16">
      <NavBar />
      <div className="md:text-6xl text-3xl text-center font-bold text-white border-b">
        Something About DevURL
      </div>

      <div className="flex md:w-4/6 w-5/6 flex-wrap  gap-3">
        {list.map((item, index) => (
          <FeatureCard key={index}>
            <div className="flex flex-col justify-center items-center md:px-5 min-h-28 gap-2 font-medium px-0 py-2">
              <p className="md:text-4xl text-xl">{item}</p>
            </div>
          </FeatureCard>
        ))}
      </div>

      <div className="text-white flex w-full h-16  justify-center items-center text-xl">
        @Copyright DevURL
      </div>
    </div>
  );
};

export default About;
