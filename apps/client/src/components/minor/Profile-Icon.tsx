import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ActiveIcon, shareIcon, showIconForm } from "../../states";
import { Link } from "react-router-dom";

interface ProfileIconProps {
  iconUrl: string;
  link?: string;
  bt: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ iconUrl, link, bt }) => {
  const location = window.location.pathname;
  const setActiveIcon = useSetRecoilState(ActiveIcon);
  const setIconForm = useSetRecoilState(showIconForm);
  return location === "/profile/dashboard" ? (
    <div
      className="drop-shadow-2xl w-fit p-2 rounded-xl bg-white"
      onClick={() => {
        setActiveIcon(bt);
        setIconForm(true);
      }}
    >
      <img src={iconUrl} alt="profile_icon" className="w-6 h-6" />
    </div>
  ) : (
    link && (
      <Link to={link} className="drop-shadow-2xl w-fit p-2 rounded-xl bg-white">
        <img src={iconUrl} alt="profile_icon" className="w-6 h-6" />
      </Link>
    )
  );
};

export const AddIcon: React.FC<{ id: number }> = ({ id }) => {
  const setActiveIcon = useSetRecoilState(ActiveIcon);
  const setIconForm = useSetRecoilState(showIconForm);
  return (
    <div
      className="drop-shadow-2xl opacity-35 w-fit p-2 rounded-xl bg-white cursor-pointer"
      onClick={() => {
        setActiveIcon(id);
        setIconForm(true);
      }}
    >
      <img
        src={
          "https://img.icons8.com/?size=100&id=60953&format=png&color=000000"
        }
        alt="profile_icon"
        className="w-6 h-6"
      />
    </div>
  );
};

export const ShareProfileIcon: React.FC<ProfileIconProps> = ({ iconUrl }) => {
  const setShareIcon = useSetRecoilState(shareIcon);

  const handleClick = () => {
    setShareIcon(true);
  };
  return (
    <div
      className="drop-shadow-2xl cursor-pointer w-fit p-1 md:p-2 rounded-xl bg-black"
      onClick={handleClick}
    >
      <img src={iconUrl} alt="profile_icon" className="w-8 h-8" />
    </div>
  );
};

export const HeaderProfileIcon: React.FC<{
  iconName: string;
  link: string;
}> = ({ iconName, link }) => {
  const [iconExists, setIconExists] = useState<boolean | null>(null);
  const iconUrl = `https://img.icons8.com/ios/452/${iconName.toLowerCase()}.png`;

  const handleClick = () => (window.location.href = link);

  useEffect(() => {
    const checkIconExists = () => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = iconUrl;
        img.onload = () => resolve(true); // Image loaded successfully
        img.onerror = () => resolve(false); // Image failed to load
      });
    };

    checkIconExists().then((exists) => {
      setIconExists(exists);
    });
  }, [iconUrl]);

  if (iconExists === null) {
    return <div>...</div>; // Or any loading indicator
  }

  if (iconExists) {
    return (
      <div
        className="drop-shadow-2xl w-fit p-2 cursor-pointer rounded-xl bg-white"
        onClick={handleClick}
      >
        <img src={iconUrl} alt={iconName} className="w-8 h-8" />
      </div>
    );
  } else {
    // If icon doesn't exist, show the first letter of the icon name
    const firstLetter = iconName.charAt(0).toUpperCase();

    return (
      <div
        className="drop-shadow-2xl bg-white  w-fit cursor-pointer p-2 rounded-xl flex justify-center items-center text-xl font-bold"
        onClick={handleClick}
      >
        <div className="icon-placeholder w-full h-full ">{firstLetter}</div>
      </div>
    );
  }
};
export default ProfileIcon;
