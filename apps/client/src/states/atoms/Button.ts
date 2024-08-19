import { atom } from "recoil";

// ---------------Dashboard States----------------

export const ActiveBtn = atom({
  key: "ActiveBtn",
  default: 0,
});

export const addHeaderButton = atom({
  key: "addHeaderButton",
  default: {
    btn1: true,
    btn2: true,
  },
});

export const headerBtnOne = atom({
  key: "headerBtnOne",
  default: {
    title: "",
    link: "",
    theme: "",
  },
});

export const headerBtnTwo = atom({
  key: "headerBtnTwo",
  default: {
    title: "",
    link: "",
    theme: "",
  },
});
