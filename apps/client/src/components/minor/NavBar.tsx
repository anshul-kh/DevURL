import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, Close } from "../../assets";
import { useLocation } from "react-router-dom";
import { decodeToken } from "react-jwt";
import ProfileMenu from "./ProfileMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCookie } from "../../hooks/cookies";

gsap.registerPlugin(ScrollTrigger);

type UserToken = {
  id: number;
  username: string;
  name: string;
  email: string;
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserToken | null>(null);
  const [popup, setPopup] = useState(false);
  const location = useLocation();
  const { cookie, rmCookie } = useCookie();
  const navRef = useRef<HTMLDivElement>(null);

  const handleClick = (route: string) => {
    if (location.pathname === route) {
      setOpen((open) => !open);
    }
  };

  useEffect(() => {
    if (cookie.token) {
      setUser(decodeToken(cookie.token) as UserToken);
    }
  }, [cookie.token]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "elastic.inOut",
          zIndex: 1000,
        },
      );
    }
  }, []);

  return (
    <div
      ref={navRef}
      className="relative w-full top-0 flex flex-col md:flex-row justify-center items-center md:px-0 z-50 px-5 py-5"
    >
      <div className="flex justify-between items-center w-full md:w-1/2 h-14 rounded-full bg-anti-flash_white-700 px-7">
        <div className="flex flex-row justify-center items-center gap-7">
          <Link to={"/"} className="text-black font-bold font-sans">
            DevURL
          </Link>

          <div className="hidden md:flex flex-row justify-center items-center gap-5 font-sans font-semibold">
            <Link to={"/feature"}>Features</Link>
            <Link to={"/about"}>About</Link>
          </div>
        </div>
        {/* If User Not Logged In  */}
        {!user && (
          <div className="hidden md:flex flex-row justify-center items-center gap-5 font-semibold">
            <Link
              to={"/auth/login"}
              className="text-black w-20 drop-shadow-3 h-9 flex justify-center items-center rounded-full"
            >
              Login
            </Link>
            <Link
              to={"/auth/signup"}
              className="text-anti-flash_white bg-black w-20 drop-shadow-3 h-9 flex justify-center items-center rounded-full"
            >
              SignUp
            </Link>
          </div>
        )}
        {/* User is Logged In */}
        {user && (
          <div
            className="hidden md:flex justify-center items-center rounded-full w-12 h-5/6 bg-black text-anti-flash_white-700 text-xl font-bold"
            onClick={() => setPopup((val) => !val)}
            onMouseEnter={() => setPopup((val) => !val)}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Profile Menu */}
        {user && popup && <ProfileMenu setPopup={setPopup} />}

        {/* Hamburger icon for mobile-devices */}
        <div
          onClick={() => setOpen((open) => !open)}
          className="flex md:hidden justify-center items-center"
        >
          <img src={open ? Close : Menu} alt="menu" className="w-8 h-8" />
        </div>
      </div>

      {/* Drawer for mobile devices */}
      {open && (
        <div className="w-11/12 h-[75vh] flex absolute md:hidden flex-col justify-start py-20 items-center z-10 gap-10 rounded-xl bg-anti-flash_white-700 top-28">
          <h1 className="text-4xl font-semibold text-black border-b-2 w-full flex justify-center items-center">
            Explore Routes
          </h1>

          <div className="text-black text-3xl z-96 flex flex-col justify-center items-center w-full mt-5 font-semibold">
            <Link
              className="border-b-2 border-t-2 w-full p-2 flex justify-center items-center"
              to={"/"}
              onClick={() => handleClick("/")}
            >
              Home
            </Link>

            <Link
              className="border-b-2 w-full p-2 flex justify-center items-center"
              to={"/feature"}
              onClick={() => handleClick("/feature")}
            >
              Feature
            </Link>

            <Link
              className="border-b-2 w-full p-2 flex justify-center items-center"
              to={"/about"}
              onClick={() => handleClick("/about")}
            >
              About
            </Link>

            {!user && (
              <>
                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={"/auth/login"}
                  onClick={() => handleClick("/auth/login")}
                >
                  Login
                </Link>

                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={"/auth/signup"}
                  onClick={() => handleClick("/auth/signup")}
                >
                  SignUp
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={`/user/${user.username}`}
                >
                  Profile
                </Link>
                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={"/profile/dashboard"}
                >
                  Dashboard
                </Link>
                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={`/user/${user.username}`}
                >
                  Share
                </Link>
                <Link
                  className="border-b-2 w-full p-2 flex justify-center items-center"
                  to={"/"}
                  onClick={() => {
                    rmCookie("token");
                    setUser(null);
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
