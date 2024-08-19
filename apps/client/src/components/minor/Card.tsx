import React from "react";
interface CardProps {
  cardStyle: string;
  text: string;
  textStyle: string;
  ImageComp: React.FC;
}

const Card: React.FC<CardProps> = React.memo(
  ({ cardStyle, text, textStyle, ImageComp }) => {
    return (
      <div
        className={`flex justify-center items-center flex-col rounded-3xl w-11/12 md:w-4/12 md:min-h-96 h-[20rem] gap-y-5 drop-shadow-lg ${cardStyle}`}
      >
        <ImageComp />
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
