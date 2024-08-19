import React from "react";
import { useRecoilValue } from "recoil";
import { external_links } from "../../states";
import { DashboardProfileButton, AddDashboardButton } from "..";

const External_Links: React.FC = () => {
  const ext_links = useRecoilValue(external_links);

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-fit py-7">
      {ext_links.map((item, index) => (
        <DashboardProfileButton text={item.title} id={index} key={index} />
      ))}

      <AddDashboardButton />
    </div>
  );
};

export default External_Links;
