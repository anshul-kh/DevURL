import React, { useState } from "react";
import { Modal } from "..";
import { Close } from "../../assets";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  showWidgetPanel,
  activeCard,
  Card1,
  Card2,
  AddCard,
} from "../../states";
import { toast } from "react-toastify";

const githubList = [
  "https://devurl-github-stats-i1s6.vercel.app//api?username=jacoblin&show_icons=true&theme=light&title_color=000&border_radius=10&icon_color=000",
  "https://devurl-github-stats-i1s6.vercel.app/api?username=jacoblin&show_icons=true&theme=dark&title_color=fff&border_radius=10&icon_color=fff",
];

const leetcodeList = [
  "https://leetcard.jacoblin.cool/jacoblin?theme=light&border_radius=10`",
  "https://leetcard.jacoblin.cool/jacoblin?theme=dark&border_radius=10",
  "https://leetcard.jacoblin.cool/jacoblin?theme=light&border_radius=10&ext=heatmap",
  "https://leetcard.jacoblin.cool/jacoblin?theme=light,unicorn&border_radius=10&ext=heatmap",
];

const Add_Widget: React.FC = () => {
  const setModal = useSetRecoilState(showWidgetPanel);
  const activeWidget = useRecoilValue(activeCard);
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const setCard1 = useSetRecoilState(Card1);
  const setCard2 = useSetRecoilState(Card2);
  const setAddCard = useSetRecoilState(AddCard);

  const handleGithubWidget = (index: number) => {
    if (!github.trim()) {
      toast("Github Username Required For this Widget");
      return;
    } else {
      const theme = index
        ? "dark&title_color=fff&icon_color=fff"
        : "light&title_color=000&icon_color=000";
      const cardUrl = `https://devurl-github-stats-i1s6.vercel.app//api?username=${github}&show_icons=true&theme=${theme}&border_radius=10`;

      if (activeWidget == 1) {
        setCard1(cardUrl);
        setAddCard((vl) => ({ ...vl, card1: false }));
      } else {
        setCard2(cardUrl);
        setAddCard((vl) => ({ ...vl, card2: false }));
      }

      setModal(false);
    }
  };

  const handleLeetcode = (index: number) => {
    if (!leetcode.trim()) {
      toast("Leetcode Username Require For this Widget");
    } else {
      const themes = [
        "light&border_radius=10",
        "dark&border_radius=10",
        "light&border_radius=10&ext=heatmap",
        "light,unicorn&border_radius=10&ext=heatmap",
      ];
      const cardUrl = `https://leetcard.jacoblin.cool/${leetcode}?theme=${leetcode}?${themes[index]}`;

      if (activeWidget == 1) {
        setCard1(cardUrl);
        setAddCard((vl) => ({ ...vl, card1: false }));
      } else {
        setCard2(cardUrl);
        setAddCard((vl) => ({ ...vl, card2: false }));
      }

      setModal(false);
    }
  };

  return (
    <Modal resize="w-5/6 md:w-3/6 h-4/5 justify-center">
      <button
        className="absolute w-3 h-3 right-4 md:left-4 "
        onClick={() => setModal(false)}
      >
        <img src={Close} alt="close" />
      </button>

      <label>
        Enter Github Username :
        <input
          type="text"
          required
          className="h-7 outline-none bg-anti-flash_white rounded-md px-2"
          placeholder="username"
          onChange={(e) => setGithub(e.target.value)}
        />
      </label>

      {githubList.map((url, index) => (
        <div key={index}>
          <img
            src={url}
            alt="stats"
            onClick={() => handleGithubWidget(index)}
            className="drop-shadow-2xl w-80"
          />
        </div>
      ))}

      <label>
        {" "}
        Enter Leetcode Username :
        <input
          type="text"
          onChange={(e) => setLeetcode(e.target.value)}
          required
          className="h-7 outline-none bg-anti-flash_white rounded-md px-2"
          placeholder="username"
        />
      </label>
      {leetcodeList.map((url, index) => (
        <div key={index}>
          <img
            src={url}
            alt="stats"
            key={index}
            onClick={() => handleLeetcode(index)}
            className="drop-shadow-2xl w-80"
          />
        </div>
      ))}
    </Modal>
  );
};

export default Add_Widget;
