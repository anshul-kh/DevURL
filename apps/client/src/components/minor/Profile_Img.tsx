import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalOpen, ProfileImg } from "../../states";

const Profile_Img: React.FC = () => {
  const imgUrl = useRecoilValue(ProfileImg);
  const setModalOpen = useSetRecoilState(ModalOpen);

  const handleImageChange = () => {
    setModalOpen((vl) => !vl);
  };
  return (
    <div
      className="drop-shadow-2xl object-fill w-56 h-56 rounded-3xl overflow-hidden"
      onClick={handleImageChange}
    >
      <img src={imgUrl} alt="Avatar" className="" />
    </div>
  );
};

export default Profile_Img;

export const HeaderProfileImg: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  return (
    <div className="drop-shadow-2xl cursor-none object-fill w-56 h-56 rounded-3xl overflow-hidden hover:scale-110 duration-200 transition-all">
      <img src={imgUrl} alt="Avatar" className="" />
    </div>
  );
};

interface Edit_ImgProps {
  url: string;
}

export const EditProfileImg: React.FC<Edit_ImgProps> = ({ url }) => {
  const setProfileImg = useSetRecoilState(ProfileImg);
  const setModalOpen = useSetRecoilState(ModalOpen);

  const handleImageChange = () => {
    setProfileImg(url);
    setModalOpen((vl) => !vl);
  };

  return (
    <div
      className="drop-shadow-2xl object-center w-52 h-52 rounded-3xl overflow-hidden"
      onClick={handleImageChange}
    >
      <img src={url} alt="Avatar" className="" />
    </div>
  );
};
