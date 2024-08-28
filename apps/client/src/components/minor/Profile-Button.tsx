import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ShowForm,
  ActiveBtn,
  showLinkForm,
  activeCard,
  external_links,
  profileData,
} from "../../states";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useCookie } from "../../hooks/cookies";

interface ProfileButtonProps {
  text: string;
  theme: string;
  link: string;
  bt: number;
}

type UserToken = {
  id: number;
  username: string;
  name: string;
  email: string;
};

const ProfileButton: React.FC<{ text: string; link: string }> = ({
  text,
  link,
}) => {
  return (
    <div
      onClick={() => (window.location.href = link)}
      className="w-5/6 md:w-2/5 cursor-pointer h-fit relative drop-shadow-xl"
    >
      <div className="w-full h-16 font-bold text-xl absolute z-10 -translate-x-1 -translate-y-1 text-black bg-white rounded-xl flex justify-center items-center">
        {text}
      </div>
      <div className="w-full h-16 bg-black rounded-xl"></div>
    </div>
  );
};

export const DashboardProfileButton: React.FC<{ text: string; id: number }> = ({
  text,
  id,
}) => {
  const activeBtn = useSetRecoilState(activeCard);
  const showForm = useSetRecoilState(showLinkForm);
  const handleClick = () => {
    activeBtn(id);
    showForm(true);
  };
  return (
    <div
      className="w-5/6 md:w-2/5 h-fit relative drop-shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full h-16 font-bold text-xl absolute z-10 -translate-x-1 -translate-y-1 text-black bg-white rounded-xl flex justify-center items-center">
        {text}
      </div>
      <div className="w-full h-16 bg-black rounded-xl"></div>
    </div>
  );
};

export const AddDashboardButton: React.FC = () => {
  const extLink = useRecoilValue(external_links);
  const setActiveBtn = useSetRecoilState(activeCard);
  const showForm = useSetRecoilState(showLinkForm);

  const handleClick = () => {
    if (extLink.length) setActiveBtn(extLink.length + 1);
    showForm(true);
  };

  return (
    <div
      className="w-5/6 md:w-2/5 h-fit relative drop-shadow-xl opacity-35 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full h-16 font-bold text-xl absolute z-10 -translate-x-1 -translate-y-1 text-black bg-white rounded-xl flex justify-center items-center">
        Add New
      </div>
      <div className="w-full h-16 bg-black rounded-xl"></div>
    </div>
  );
};

export const ProfileButtonSmall: React.FC<ProfileButtonProps> = ({
  text,
  theme,
  link,
  bt,
}) => {
  const setActiveBtn = useSetRecoilState(ActiveBtn);
  const setShowForm = useSetRecoilState(ShowForm);
  const location = window.location.pathname;
  return (
    <>
      {location === "/profile/dashboard" ? (
        <div
          className={`w-80 rounded-xl h-12 flex justify-center items-center text-xl drop-shadow-xl cursor-pointer ${theme == "dark" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => {
            setActiveBtn(bt);
            setShowForm((vl) => !vl);
          }}
        >
          {text}
        </div>
      ) : (
        <div
          onClick={() => (window.location.href = link)}
          className={`cursor-pointer w-80 rounded-xl h-12 flex justify-center items-center  text-xl drop-shadow-xl ${theme == "dark" ? "bg-black text-white" : "bg-white text-black"}`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export const AddProfileButtonSmall: React.FC<{ bt: number }> = ({ bt }) => {
  const setActiveBtn = useSetRecoilState(ActiveBtn);
  const setShowForm = useSetRecoilState(ShowForm);
  return (
    <div
      className={`w-80 rounded-xl h-12 flex justify-center items-center text-lg font-bold bg-opacity-35 drop-shadow-xl bg-black text-white cursor-pointer`}
      onClick={() => {
        setActiveBtn(bt);
        setShowForm((vl) => !vl);
      }}
    >
      Add Button
    </div>
  );
};

export default ProfileButton;

export const SaveButton: React.FC = () => {
  const data = useRecoilValue(profileData);
  const { cookie, setCookie } = useCookie();

  const handleSave = () => {
    setCookie("profile", JSON.stringify(data));

    const token = cookie.token;
    if (token) {
      const { id, username } = decodeToken(token) as UserToken;

      const baseURL = import.meta.env.VITE_API_URL;
      axios
        .post(
          `${baseURL}profile`,
          {
            userId: id,
            metadata: data.metadata,
            stats: data.stats,
            links: data.links,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.data.success) {
            toast(res.data.msg);
            window.location.href = `/user/${username}`;
          } else {
            toast(res.data.err);
          }
        })
        .catch(() => {
          toast("Something Went Worng");
        });
    }
  };

  return (
    <div
      className={` rounded-xl w-5/6 md:w-2/5 h-16 flex justify-center items-center text-xl drop-shadow-xl bg-black text-white cursor-pointer`}
      onClick={handleSave}
    >
      Save Changes
    </div>
  );
};
