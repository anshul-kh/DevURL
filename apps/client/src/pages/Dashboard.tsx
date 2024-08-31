import React, { useEffect, useState } from "react";
import {
  Bar,
  Dashboard_Header,
  External_Links,
  LinkForm,
  SaveButton,
  Loader,
} from "../components";
import { useRecoilValue } from "recoil";
import { showLinkForm } from "../states";
import {
  ProfileImg,
  ProfileText,
  addHeaderButton,
  headerBtnOne,
  headerBtnTwo,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  addIcon,
  AddCard,
  Card1,
  Card2,
  external_links,
} from "../states";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useCookie } from "../hooks/cookies";
import axios from "axios";
import { decodeToken } from "react-jwt";

type userState = {
  id: number;
  username: string;
  name: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const form = useRecoilValue(showLinkForm);
  const setProfileImg = useSetRecoilState(ProfileImg);
  const setProfileText = useSetRecoilState(ProfileText);
  const setAddBtn = useSetRecoilState(addHeaderButton);
  const setHeaderBtn1 = useSetRecoilState(headerBtnOne);
  const setHeaderBtn2 = useSetRecoilState(headerBtnTwo);
  const setIcon1 = useSetRecoilState(Icon1);
  const setIcon2 = useSetRecoilState(Icon2);
  const setIcon3 = useSetRecoilState(Icon3);
  const setIcon4 = useSetRecoilState(Icon4);
  const setAddIcon = useSetRecoilState(addIcon);

  const setAddCard = useSetRecoilState(AddCard);
  const setCard1 = useSetRecoilState(Card1);
  const setCard2 = useSetRecoilState(Card2);

  const setExternalLinks = useSetRecoilState(external_links);

  const { cookie } = useCookie();

  useEffect(() => {
    const fetch_data = async (user: string) => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${baseURL}profile/${user}`);

        if (!res) {
          toast.error(`Unable To Sync Data`);
          return null;
        }

        if (res.data.success) {
          return res.data.data.profile[0];
        } else {
          toast.error(res.data.msg);
          return null;
        }
      } catch (err) {
        toast.error(`err: ${err}`);
        return null;
      }
    };

    const init_dashbaord = async () => {
      setLoading(true);
      const token = cookie.token;
      let data = cookie.profile;

      if (!token) {
        toast("Invalid Token");
        toast("Try Login Again");
        setTimeout(() => (window.location.href = "/"), 1900);
        setLoading(false);
        return;
      }

      if (!data) {
        const { username } = decodeToken(token) as userState;
        data = await fetch_data(username);
      }

      if (data === null) {
        toast.error("Synced Data Is Null");
        setLoading(false);
        return;
      }

      setProfileImg(data.metadata.img);
      setProfileText(data.metadata.user);
      // header btns
      if (data.links.header.btn.btn1.title != "") {
        setAddBtn((vl) => ({ ...vl, btn1: false }));
        setHeaderBtn1(data.links.header.btn.btn1);
      }
      if (data.links.header.btn.btn2.title != "") {
        setAddBtn((vl) => ({ ...vl, btn2: false }));
        setHeaderBtn2(data.links.header.btn.btn2);
      }
      // icons
      if (data.links.header.icon.icon1.icon != "") {
        setAddIcon((vl) => ({ ...vl, icon1: false }));
        setIcon1(data.links.header.icon.icon1);
      }
      if (data.links.header.icon.icon2.icon != "") {
        setAddIcon((vl) => ({ ...vl, icon2: false }));
        setIcon2(data.links.header.icon.icon2);
      }
      if (data.links.header.icon.icon3.icon != "") {
        setAddIcon((vl) => ({ ...vl, icon3: false }));
        setIcon3(data.links.header.icon.icon3);
      }
      if (data.links.header.icon.icons4.icon != "") {
        setAddIcon((vl) => ({ ...vl, icon4: false }));
        setIcon4(data.links.header.icon.icons4);
      }

      // stats card
      if (data.stats.card1 != "") {
        setAddCard((vl) => ({ ...vl, card1: false }));
        setCard1(data.stats.card1);
      }
      if (data.stats.card2 != "") {
        setAddCard((vl) => ({ ...vl, card2: false }));
        setCard2(data.stats.card2);
      }

      // external links
      if (data.links.extLinks) {
        setExternalLinks(data.links.extLinks);
      }

      setLoading(false);
    };

    init_dashbaord();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen h-fit w-full flex flex-col justify-start items-start bg-anti-flash_white py-2 ">
      {form && <LinkForm />}

      {/* Header */}
      <div className="flex flex-col justify-center items-center w-full gap-2">
        <Dashboard_Header />
        <Bar direction="horizontal" />
      </div>

      <External_Links />

      <div className="flex justify-center items-center w-full h-fit ">
        <SaveButton />
      </div>
    </div>
  );
};

export default Dashboard;
