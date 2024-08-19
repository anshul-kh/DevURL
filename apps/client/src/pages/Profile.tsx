import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import {
  Bar,
  HeaderProfileIcon,
  HeaderProfileImg,
  HeaderStats,
  ProfileButtonSmall,
  ShareProfileIcon,
  ProfileButton,
  ShareProfile,
} from "../components";
import { Share } from "../assets";
import { ExternalLink } from "../states/atoms/Links";
import { useRecoilValue } from "recoil";
import { shareIcon } from "../states";
import { toast } from "react-toastify";
import { useCookie } from "../hooks/cookies";

// Types of Profile States;
interface MetadataProps {
  user: {
    name: string;
    role: string;
  };
  img: string;
}

interface LinksProps {
  header: {
    btn: {
      btn1: {
        title: string;
        link: string;
        theme: string;
      };
      btn2: {
        title: string;
        link: string;
        theme: string;
      };
    };
    icon: {
      icon1: {
        icon: string;
        link: string;
      };
      icon2: {
        icon: string;
        link: string;
      };
      icon3: {
        icon: string;
        link: string;
      };
      icon4: {
        icon: string;
        link: string;
      };
    };
  };
  extlinks: ExternalLink[];
}

const Profile: React.FC = () => {
  const [metadata, setMetadata] = useState<MetadataProps | null>(null);
  const [links, setLinks] = useState<LinksProps | null>(null);
  const [stats, setStats] = useState<Record<string, any>>({});
  const [extlinks, setExtLinks] = useState<ExternalLink[]>([]);
  const showShareIcon = useRecoilValue(shareIcon);
  const { cookie } = useCookie();
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const parsedData = cookie.profile;
      if (parsedData) {
        setMetadata(parsedData.metadata);
        setLinks(parsedData.links);
        setStats(parsedData.stats);
        setExtLinks(parsedData.links.extLinks);
      } else {
        try {
          if (!username) {
            return;
          }

          const res = await axios.get(`/api/profile/${username}`);
          if (res.data.success) {
            const { metadata, links, stats } = res.data.data.profile[0];

            setMetadata(metadata);
            setLinks(links);
            setStats(stats);
            setExtLinks(links.extLinks);
          } else {
            toast.error(res.data.msg);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [cookie.profile, username]);

  return (
    <div className="min-h-screen h-fit w-full flex flex-col justify-start items-start bg-anti-flash_white ">
      {/* Header */}
      <div className="flex flex-col justify-center items-center w-full gap-2">
        {showShareIcon && <ShareProfile />}
        <div className="px-10 md:px-20 py-2 flex w-full md:h-fit h-full justify-start items-start flex-col gap-5">
          <ShareProfileIcon iconUrl={Share} bt={0} />

          <div className="flex justify-center items-center w-full h-full gap-10 flex-col md:flex-row">
            {metadata && (
              <div className="flex justify-center items-center flex-col gap-1">
                <HeaderProfileImg imgUrl={metadata.img} />

                {/* User and Role */}
                <p>{metadata.user.name}</p>
                <p>{metadata.user.role}</p>
                {/* Header Icons */}
                <div className="flex gap-3 justify-center items-center">
                  {links &&
                    Object.entries(links?.header.icon).map((icon, index) => {
                      return (
                        icon[1].icon !== "" && (
                          <HeaderProfileIcon
                            iconName={icon[1].icon}
                            link={icon[1].link}
                            key={index}
                          />
                        )
                      );
                    })}
                </div>
              </div>
            )}

            {/* // Widget Section */}

            <div className="flex md:flex-row flex-col justify-center items-center gap-5 ">
              {/* // Widget One */}
              <div className="flex justify-center items-center gap-4 flex-col">
                {links && links.header.btn.btn1.title != "" && (
                  <ProfileButtonSmall
                    text={links.header.btn.btn1.title}
                    link={links.header.btn.btn1.link}
                    theme={links.header.btn.btn1.theme}
                    bt={1}
                  />
                )}
                {stats?.card1 != "" && <HeaderStats url={stats?.card1} />}
              </div>

              {/* // Widget Two */}

              <div className="flex justify-center items-center gap-4 flex-col">
                {links && links.header.btn.btn2.title != "" && (
                  <ProfileButtonSmall
                    text={links.header.btn.btn2.title}
                    link={links.header.btn.btn2.link}
                    theme={links.header.btn.btn2.theme}
                    bt={2}
                  />
                )}
                {stats?.card2 != "" && <HeaderStats url={stats?.card2} />}
              </div>
            </div>
          </div>
        </div>
        <Bar direction="horizontal" />
      </div>

      {/* External Links */}
      <div className="flex flex-col gap-5 justify-center items-center w-full h-fit py-7">
        <p className="text-xl font-bold opacity-35 ">
          Few More Links to Explore
        </p>
        {extlinks &&
          extlinks.map((link, index) => {
            return (
              <ProfileButton text={link.title} link={link.link} key={index} />
            );
          })}
      </div>

      {/* Copyright @DevURL */}
      <div
        className="bg-black text-white h-7 w-full flex items-center justify-center text-sm "
        onClick={() => (window.location.href = "/")}
      >
        @CopyRight DevURL
      </div>
    </div>
  );
};

export default Profile;
