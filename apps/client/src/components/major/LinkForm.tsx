import React, { useEffect } from "react";
import { Modal } from "..";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { activeCard, external_links, showLinkForm } from "../../states";

import { Close } from "../../assets";

const ButtonForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");

  interface ExternalLink {
    title: string;
    link: string;
  }

  const [extLink, setExtLinks] = useRecoilState(external_links);
  const setModal = useSetRecoilState(showLinkForm);
  const activeBtn = useRecoilValue(activeCard);

  const handleDelete = () => {
    setExtLinks((prevVal: ExternalLink[]) =>
      prevVal.filter((_, index) => index !== activeBtn),
    );
    setModal(false);
  };

  // handle the new button creation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (extLink.length <= activeBtn) {
      setExtLinks((prevVal: ExternalLink[]) => [...prevVal, { title, link }]);
    } else {
      setExtLinks((prevVal: ExternalLink[]) =>
        prevVal.map((item, index) =>
          index === activeBtn ? { title, link } : item,
        ),
      );
    }
    setModal(false);
  };

  useEffect(() => {
    if (extLink.length === 0 || extLink.length <= activeBtn) return;
    setTitle(extLink[activeBtn].title);
    setLink(extLink[activeBtn].link);
  }, [extLink, activeBtn]);

  return (
    <Modal resize="w-5/6 md:w-1/4 min-h-2/4 h-fit">
      <button className="absolute w-3 h-3" onClick={() => setModal(false)}>
        <img src={Close} alt="close" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-start flex-col gap-5 p-2 w-full h-full"
      >
        <h1 className="w-full text-center font-bold text-xl">
          {" "}
          External Links
        </h1>
        <label className="font-medium text-lg flex flex-col w-full ">
          Enter Button Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="eg: Youtube"
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
            placeholder="eg: https://youtube.com"
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

        {extLink.length > activeBtn && (
          <div className="w-full h-10 flex justify-center items-center ">
            <button
              onClick={handleDelete}
              className="w-full bg-black text-white h-full rounded-xl"
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default ButtonForm;
