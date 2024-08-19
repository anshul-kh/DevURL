import { atom } from "recoil";

export const activeCard = atom({
  key: "activeCard",
  default: 0,
});

export const showWidgetPanel = atom({
  key: "showWidgetPanel",
  default: false,
});

export const Card1 = atom({
  key: "Card1",
  default: "",
});

export const Leetcode = atom({
  key: "Leetcode",
  default: "",
});
export const Github = atom({
  key: "Github",
  default: "",
});

export const AddCard = atom({
  key: "AddCard",
  default: {
    card1: true,
    card2: true,
  },
});

export const Card2 = atom({
  key: "Card2",
  default: "",
});
