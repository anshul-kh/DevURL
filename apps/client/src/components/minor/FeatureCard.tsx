import React, { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-anti-flash_white-700 border border-cadet_gray-800 text-black flex flex-row justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default FeatureCard;
