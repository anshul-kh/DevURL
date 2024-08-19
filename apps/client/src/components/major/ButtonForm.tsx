import React, { useEffect } from "react";
import { Modal } from "..";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import {
  ActiveBtn,
  headerBtnOne,
  headerBtnTwo,
  addHeaderButton,
  ShowForm,
} from "../../states";
import { Close } from "../../assets";

const ButtonForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [theme, setTheme] = React.useState<string>("");

  const activeBtn = useRecoilValue(ActiveBtn);
  const [HeaderBtnOne, setHeaderBtnOne] = useRecoilState(headerBtnOne);
  const [HeaderBtnTwo, setHeaderBtnTwo] = useRecoilState(headerBtnTwo);
  const setAddHeaderBtn = useSetRecoilState(addHeaderButton);
  const setModal = useSetRecoilState(ShowForm);

  // Handle Delete The Option
  const handleDelete = () => {
    if (activeBtn === 1) {
      setHeaderBtnOne({ title: "", link: "", theme: "" });
      setAddHeaderBtn((vl) => ({ ...vl, btn1: true }));
    }

    if (activeBtn === 2) {
      setHeaderBtnTwo({ title: "", link: "", theme: "" });
      setAddHeaderBtn((vl) => ({ ...vl, btn2: true }));
    }
    setModal(false);
  };

  // handle the new button creation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    if (activeBtn === 1) {
      setHeaderBtnOne({ title, link, theme });
      setAddHeaderBtn((vl) => ({ ...vl, btn1: false }));
    }

    if (activeBtn === 2) {
      setHeaderBtnTwo({ title, link, theme });
      setAddHeaderBtn((vl) => ({ ...vl, btn2: false }));
    }

    setModal(false);
  };

  useEffect(() => {
    if (activeBtn === 1) {
      setTitle(HeaderBtnOne.title);
      setLink(HeaderBtnOne.link);
      setTheme(HeaderBtnOne.theme);
    }

    if (activeBtn === 2) {
      setTitle(HeaderBtnTwo.title);
      setLink(HeaderBtnTwo.link);
      setTheme(HeaderBtnTwo.theme);
    }
  }, [activeBtn, HeaderBtnOne, HeaderBtnTwo]);

  return (
    <Modal resize="w-5/6 md:w-1/4 min-h-2/4 h-fit">
      <button className="absolute w-3 h-3" onClick={() => setModal(false)}>
        {" "}
        <img src={Close} alt="close" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-start flex-col gap-5 p-2 w-full h-full"
      >
        <h1 className="w-full text-center font-bold text-xl"> Header Icon</h1>
        <label className="font-medium text-lg flex flex-col w-full ">
          Enter Button Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

        <label className="font-medium">
          Select Theme:
          <div className="flex gap-5 px-5">
            <div
              onClick={() => setTheme("dark")}
              className={`${theme == "dark" ? "bg-black text-white" : "bg-anti-flash_white"} w-20 text-center rounded `}
            >
              Dark
            </div>
            <div
              onClick={() => setTheme("light")}
              className={`${theme == "light" ? "bg-black text-white" : "bg-anti-flash_white"} w-20 text-center rounded`}
            >
              Light
            </div>
          </div>
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

export default ButtonForm;
