import React from "react";

interface BarProps {
  direction: "vertical" | "horizontal";
}

const Bar: React.FC<BarProps> = ({ direction }) => {
  return (
    <div
      className={`bg-black ${direction == "vertical" ? "absolute z-10 ml-[11vw] w-3 h-full" : "h-2 w-5/6 "}`}
    ></div>
  );
};

export default Bar;
