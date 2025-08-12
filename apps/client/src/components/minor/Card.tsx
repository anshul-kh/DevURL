import React from "react";
interface CardProps {
  cardStyle: string;
  text: string;
  textStyle: string;
  ImageComp: any;
}

const Card: React.FC<CardProps> = React.memo(
  ({ cardStyle, text, textStyle, ImageComp }) => {
    return (
      <div
        className={`flex justify-center border border-cadet_gray-800 items-center flex-col rounded-3xl w-11/12 md:w-[21rem] h-[20rem] gap-y-5 ${cardStyle}`}
      >
        {ImageComp}
        <h1
          className={`flex justify-center items-center font-bold md:text-xl ${textStyle}`}
        >
          {text}
        </h1>
      </div>
    );
  },
);

export default Card;
