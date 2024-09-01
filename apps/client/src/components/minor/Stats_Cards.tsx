import React, { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  activeCard,
  showWidgetPanel,
  Card1,
  Card2,
  AddCard,
} from "../../states";
interface CardProps {
  url: string;
  id: number;
}

export const Stats_Card: React.FC<CardProps> = ({ url, id }) => {
  const [showDel, setShowDel] = useState(false);
  const resetCard1 = useResetRecoilState(Card1);
  const resetCard2 = useResetRecoilState(Card2);
  const setAddCard = useSetRecoilState(AddCard);

  const handleReset = () => {
    if (id == 1) {
      resetCard1();
      setAddCard((vl) => ({ ...vl, card1: true }));
    } else {
      resetCard2();
      setAddCard((vl) => ({ ...vl, card2: true }));
    }
  };

  return (
    <div
      onMouseEnter={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
      className={
        "flex justify-center items-center transition-all duration-200 hover:scale-110"
      }
    >
      <img
        src={url}
        alt="stats"
        className={`drop-shadow-2xl w-80 ${showDel ? "opacity-35" : ""}`}
      />
      {showDel && (
        <div
          className="absolute  flex justify-center items-center text-xl font-bold"
          onClick={handleReset}
        >
          X
        </div>
      )}
    </div>
  );
};

export const Empty_Stats: React.FC<{ id: number }> = ({ id }) => {
  const setCurrentCard = useSetRecoilState(activeCard);
  const setShowPanel = useSetRecoilState(showWidgetPanel);
  return (
    <div
      className="w-80 rounded-xl opacity-35 h-40 cursor-pointer flex justify-center items-center hover:scale-110 transition-all duration-200 bg-white text-black"
      onClick={() => {
        setCurrentCard(id);
        setShowPanel(true);
      }}
    >
      <img
        src={
          "https://img.icons8.com/?size=100&id=60953&format=png&color=000000"
        }
        alt="stats"
        className="drop-shadow-2xl w-10 h-10"
      />
      <p className="drop-shadow-xl"> Add Widget </p>
    </div>
  );
};

export const HeaderStats: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div
      className={
        "flex cursor-pointer transition-all duration-200  hover:scale-110 justify-center items-center"
      }
    >
      <img src={url} alt="stats" className={`drop-shadow-2xl w-80 `} />
    </div>
  );
};
