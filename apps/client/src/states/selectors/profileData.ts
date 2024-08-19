import { selector } from "recoil";
import {
  Card1,
  Card2,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  ProfileImg,
  ProfileText,
  external_links,
  headerBtnOne,
  headerBtnTwo,
} from "..";

export const profileData = selector({
  key: "profileData",
  get: ({ get }) => {
    const profileImg = get(ProfileImg);
    const profileText = get(ProfileText);

    const headerBtn1 = get(headerBtnOne);
    const headerBtn2 = get(headerBtnTwo);

    const headerIcon1 = get(Icon1);
    const headerIcon2 = get(Icon2);
    const headerIcon3 = get(Icon3);
    const headerIcon4 = get(Icon4);

    const statCard1 = get(Card1);
    const statCard2 = get(Card2);

    const extLinks = get(external_links);

    const data = {
      metadata: {
        user: profileText,
        img: profileImg,
      },
      stats: {
        card1: statCard1,
        card2: statCard2,
      },
      links: {
        header: {
          icon: {
            icon1: headerIcon1,
            icon2: headerIcon2,
            icon3: headerIcon3,
            icons4: headerIcon4,
          },
          btn: {
            btn1: headerBtn1,
            btn2: headerBtn2,
          },
        },
        extLinks,
      },
    };

    return data;
  },
});
