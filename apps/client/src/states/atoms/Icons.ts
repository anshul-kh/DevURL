import { atom } from "recoil";

export const ActiveIcon = atom({
  key: "ActiveIcon",
  default: 0,
});

export const showIconForm = atom({
  key: "showIconForm",
  default: false,
});

export const addIcon = atom({
  key: "addIcon",
  default: {
    icon1: true,
    icon2: true,
    icon3: true,
    icon4: true,
  },
});

export const Icon1 = atom({
  key: "Icon1",
  default: {
    icon: "",
    link: "",
  },
});

export const Icon2 = atom({
  key: "Icon2",
  default: {
    icon: "",
    link: "",
  },
});

export const Icon3 = atom({
  key: "Icon3",
  default: {
    icon: "",
    link: "",
  },
});

export const Icon4 = atom({
  key: "Icon4",
  default: {
    icon: "",
    link: "",
  },
});

export const shareIcon = atom({
  key: "shareIcon",
  default: false,
});
