import React, { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ children }) => {
  return (
    <div
      className={`bg-black-400 text-white flex flex-row justify-center items-center md:px-0 px-5 rounded-2xl py-0 gap-7 overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default FeatureCard;
