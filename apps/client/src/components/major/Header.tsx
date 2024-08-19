import React from "react";

import {
  ShareProfileIcon,
  ProfileImg,
  Dashboard_Input,
  ProfileButtonSmall,
  ProfileIcon,
  AddIcon,
  Edit_Img,
  ButtonForm,
  IconForm,
  Empty_Stats,
  Add_Widget,
  Stats_Card,
} from "..";

import { Share } from "../../assets";

import {
  addHeaderButton,
  ModalOpen,
  ProfileText,
  headerBtnOne,
  ShowForm,
  headerBtnTwo,
  addIcon,
  showIconForm,
  showWidgetPanel,
  AddCard,
  Card1,
  Card2,
} from "../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { AddProfileButtonSmall } from "../minor/Profile-Button";

export const HeaderIcon: React.FC = () => {
  const addIconState = useRecoilValue(addIcon);
  return (
    <div className="flex gap-3 justify-center items-center">
      {Object.entries(addIconState).map((icon, index) => {
        return (
          !icon[1] && (
            <ProfileIcon
              iconUrl="https://img.icons8.com/ios/452/blogger.png"
              key={index}
              bt={index + 1}
            />
          )
        );
      })}

      {Object.entries(addIconState).map((icon, index) => {
        return icon[1] && <AddIcon key={index} id={index + 1} />;
      })}
    </div>
  );
};

export const HeaderButtonSmall: React.FC<{ bt: 1 | 2 }> = ({ bt }) => {
  const addBtn = useRecoilValue(addHeaderButton);
  const headerBtn1 = useRecoilValue(headerBtnOne);
  const headerBtn2 = useRecoilValue(headerBtnTwo);

  return (
    <>
      {/* Button One */}

      {bt === 1 &&
        (!addBtn.btn1 ? (
          <ProfileButtonSmall
            bt={bt}
            text={headerBtn1.title}
            link={headerBtn1.link}
            theme={headerBtn1.theme}
          />
        ) : (
          <AddProfileButtonSmall bt={bt} key={bt} />
        ))}

      {/* Button Two */}
      {bt === 2 &&
        (!addBtn.btn2 ? (
          <ProfileButtonSmall
            bt={bt}
            text={headerBtn2.title}
            link={headerBtn2.link}
            theme={headerBtn2.theme}
          />
        ) : (
          <AddProfileButtonSmall bt={bt} key={bt} />
        ))}
    </>

    // <div className="flex justify-center items-center gap-5">
  );
};

export const Dashboard_Header: React.FC = () => {
  const [profileText, setProfileText] = useRecoilState(ProfileText);
  const modal = useRecoilValue(ModalOpen);
  const showForm = useRecoilValue(ShowForm);
  const ShowIconForm = useRecoilValue(showIconForm);
  const showWidget = useRecoilValue(showWidgetPanel);
  const addCard = useRecoilValue(AddCard);
  const card1 = useRecoilValue(Card1);
  const card2 = useRecoilValue(Card2);

  const handleNameChange = (newName: string) => {
    setProfileText((prevProfileText) => ({
      ...prevProfileText,
      name: newName,
    }));
  };

  const handleRoleChange = (newRole: string) => {
    setProfileText((prevProfileText) => ({
      ...prevProfileText,
      role: newRole,
    }));
  };

  return (
    <div className="px-10 md:px-20 py-2 flex w-full md:h-fit h-full justify-start items-start flex-col gap-5">
      <ShareProfileIcon iconUrl={Share} bt={0} />

      {modal && <Edit_Img />}

      {showForm && <ButtonForm />}

      {ShowIconForm && <IconForm />}

      {showWidget && <Add_Widget />}

      <div className="flex justify-center items-center w-full h-full gap-10 flex-col md:flex-row">
        <div className="flex justify-center items-center flex-col gap-1">
          <ProfileImg />

          <Dashboard_Input
            title="Name"
            value={profileText.name}
            setValue={handleNameChange}
          />

          <Dashboard_Input
            title="Role"
            value={profileText.role}
            setValue={handleRoleChange}
            className="text-sm"
          />

          <HeaderIcon />
        </div>

        {/*  Widget Section */}
        <div className="flex md:flex-row flex-col justify-center items-center gap-5  ">
          {/*  Widget One */}
          <div className="flex justify-center items-center gap-4 flex-col">
            <HeaderButtonSmall bt={1} />
            {!addCard.card1 ? (
              <Stats_Card url={card1} id={1} />
            ) : (
              <Empty_Stats id={1} />
            )}
          </div>

          {/* Widget Two */}
          <div className="flex justify-center items-center gap-4 flex-col">
            <HeaderButtonSmall bt={2} />
            {!addCard.card2 ? (
              <Stats_Card url={card2} id={2} />
            ) : (
              <Empty_Stats id={2} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
