import { atom } from "recoil";
import { ExternalLink } from "./Links";

export const profile = atom({
  key: "profile",
  default: {
    metadata: {
      user: {
        name: "",
        role: "",
      },
      img: "",
      github: "",
      leetcode: "",
    },
    stats: {
      card1: "",
      card2: "",
    },
    links: {
      header: {
        icon: {
          icon1: {
            icon: "",
            link: "",
          },
          icon2: {
            icon: "",
            link: "",
          },
          icon3: {
            icon: "",
            link: "",
          },
          icons4: {
            icon: "",
            link: "",
          },
        },
        btn: {
          btn1: {
            title: "",
            link: "",
            theme: "",
          },
          btn2: {
            title: "",
            link: "",
            theme: "",
          },
        },
      },
    },
    extLinks: [] as ExternalLink[],
  },
});
