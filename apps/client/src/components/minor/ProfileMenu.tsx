import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { gsap } from "gsap";
import { useCookie } from "../../hooks/cookies";

type userState = {
  id: number;
  username: string;
  name: string;
  email: string;
};

type ProfileMenuProps = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ setPopup }) => {
  const [user, setUser] = useState<userState>();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { cookie, rmCookie } = useCookie();

  const handleLogout = () => {
    rmCookie("token");
    if (cookie.profile) {
      rmCookie("profile");
    }
    setUser(undefined);
    window.location.href = "/";
  };

  const closePopup = () => {
    setPopup((pop) => !pop);
  };

  useEffect(() => {
    (async () => {
      const token = cookie.token;
      if (token && token != null) {
        setUser(decodeToken(token) as userState);
      }
    })();

    if (menuRef.current) {
      gsap.from(menuRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [cookie.token]);

  return (
    <div
      ref={menuRef}
      className="hidden md:absolute top-20 right-28 bg-white w-80 rounded-3xl p-10 z-50 md:flex justify-center items-center flex-col"
      onMouseLeave={closePopup}
    >
      {user && (
        <div className="flex flex-col justify-center items-center gap-4 w-full overflow-hidden">
          <div className="hidden md:flex justify-center items-center rounded-full w-16 h-16 bg-black text-anti-flash_white-700 text-xl font-bold">
            {user?.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex items-center justify-center flex-col bg-anti-flash_white-600 w-5/6 min-h-16 rounded-md gap-2 overflow-hidden">
            <p className="text-sm text-wrap">
              Username : {user?.name.toUpperCase()}
            </p>
          </div>

          <div className="flex justify-center items-center flex-col w-5/6 gap-3">
            {user && user != null && location.pathname !== "/profile" && (
              <Link
                to={`/user/${user.username}`}
                onClick={closePopup}
                className="border-b-white bg-black rounded-md text-white w-full flex items-center justify-center h-10"
              >
                Profile
              </Link>
            )}

            {user &&
              user != null &&
              location.pathname !== "/profile/dashboard" && (
                <Link
                  to={"/profile/dashboard"}
                  onClick={closePopup}
                  className="border-b-white bg-black rounded-md text-white w-full flex items-center justify-center h-10"
                >
                  Dashboard
                </Link>
              )}

            <Link
              to={`/user/${user.username}`}
              onClick={closePopup}
              className="border-b-white bg-black rounded-md w-full text-white text-center flex items-center justify-center h-10"
            >
              Share
            </Link>
            <button
              onClick={handleLogout}
              className="border-b-white bg-black rounded-md text-white w-full text-center flex items-center justify-center h-10"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
