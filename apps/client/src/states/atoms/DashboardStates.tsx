import { atom } from "recoil";

export const ProfileImg = atom({
  key: "profileImg",
  default:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
});

export const ProfileText = atom({
  key: "profileText",
  default: {
    name: "",
    role: "",
  },
});

export const Github = atom({
  key: "github",
  default: "",
});

export const ProfileIcon = atom({
  key: "profileIcon",
  default: [],
});

export const Leetcode = atom({
  key: "leetcode",
  default: "",
});

export const ModalOpen = atom({
  key: "modalOpen",
  default: false,
});

export const ShowForm = atom({
  key: "showForm",
  default: false,
});

export const HeaderLinks = atom({
  key: "headerLinks",
  default: [],
});
