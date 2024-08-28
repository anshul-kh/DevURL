import React, { useEffect } from "react";
import { Modal } from "..";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  ActiveIcon,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  addIcon,
  showIconForm,
} from "../../states";
import { Close } from "../../assets";
const IconForm: React.FC = () => {
  const [icon, setIcon] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");

  const activeIcon = useRecoilValue(ActiveIcon);
  const [HeaderIconOne, setHeaderIconOne] = useRecoilState(Icon1);
  const [HeaderIconTwo, setHeaderIconTwo] = useRecoilState(Icon2);
  const [HeaderIconThree, setHeaderIconThree] = useRecoilState(Icon3);
  const [HeaderIconFour, setHeaderIconFour] = useRecoilState(Icon4);
  const setAddHeaderIcon = useSetRecoilState(addIcon);
  const setModal = useSetRecoilState(showIconForm);

  const handleDelete = () => {
    if (activeIcon === 1) {
      setHeaderIconOne({ icon: "", link: "" });
      setAddHeaderIcon((vl) => ({ ...vl, icon1: true }));
    }

    if (activeIcon === 2) {
      setHeaderIconTwo({ icon: "", link: "" });
      setAddHeaderIcon((vl) => ({ ...vl, icon2: true }));
    }

    if (activeIcon === 3) {
      setHeaderIconThree({ icon: "", link: "" });
      setAddHeaderIcon((vl) => ({ ...vl, icon3: true }));
    }

    if (activeIcon === 4) {
      setHeaderIconFour({ icon: "", link: "" });
      setAddHeaderIcon((vl) => ({ ...vl, icon4: true }));
    }

    setModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (activeIcon === 1) {
      setHeaderIconOne({ icon, link });
      setAddHeaderIcon((vl) => ({ ...vl, icon1: false }));
    }

    if (activeIcon === 2) {
      setHeaderIconTwo({ icon, link });
      setAddHeaderIcon((vl) => ({ ...vl, icon2: false }));
    }

    if (activeIcon === 3) {
      setHeaderIconThree({ icon, link });
      setAddHeaderIcon((vl) => ({ ...vl, icon3: false }));
    }

    if (activeIcon === 4) {
      setHeaderIconFour({ icon, link });
      setAddHeaderIcon((vl) => ({ ...vl, icon4: false }));
    }

    setModal(false);
  };

  useEffect(() => {
    if (activeIcon === 1) {
      setIcon(HeaderIconOne.icon);
      setLink(HeaderIconOne.link);
    }

    if (activeIcon === 2) {
      setIcon(HeaderIconTwo.icon);
      setLink(HeaderIconTwo.link);
    }

    if (activeIcon === 3) {
      setIcon(HeaderIconThree.icon);
      setLink(HeaderIconThree.link);
    }

    if (activeIcon === 4) {
      setIcon(HeaderIconFour.icon);
      setLink(HeaderIconFour.link);
    }
  }, [
    activeIcon,
    HeaderIconOne,
    HeaderIconTwo,
    HeaderIconThree,
    HeaderIconFour,
  ]);

  return (
    <Modal resize="w-5/6 md:w-1/4 min-h-2/4 h-fit">
      <button className="absolute w-3 h-3" onClick={() => setModal(false)}>
        <img src={Close} alt="close" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-start flex-col gap-5 p-2 w-full h-full"
      >
        <h1 className="w-full text-center font-bold text-xl"> Header Icon</h1>
        <label className="font-medium text-lg flex flex-col w-full ">
          Enter Button icon:
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="eg: Github"
            className="font-normal outline-none bg-anti-flash_white h-10 w-full rounded-md px-2"
            required
          />
        </label>
        <label className="font-medium text-lg flex flex-col w-full">
          Enter Button Link:
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="eg: https://github.com"
            required
            className="font-normal outline-none bg-anti-flash_white h-10 w-full rounded-md px-2"
          />
        </label>

        <div className="w-full h-10 flex justify-center items-center ">
          <input
            type="submit"
            className="w-full bg-black text-white h-full rounded-xl"
          />
        </div>

        <div className="w-full h-10 flex justify-center items-center ">
          <button
            onClick={handleDelete}
            className="w-full bg-black text-white h-full rounded-xl"
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default IconForm;
