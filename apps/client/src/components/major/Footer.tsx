import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-48 w-screen flex justify-evenly items-center flex-col bg-black text-anti-flash_white-700 rounded text-xl">
      <div className="flex justify-center items-center md:gap-24 gap-7">
        <Link to={"/"} className="flex justify-center items-center gap-2">
          <HomeIcon />
          <h1>Home</h1>
        </Link>
        <Link
          to={"/feature"}
          className="flex justify-center items-center gap-2"
        >
          <FeaturedPlayListIcon />
          <h1>Features</h1>
        </Link>
        <Link to={"/about"} className="flex justify-center items-center gap-2">
          <PersonIcon />
          <h1>About</h1>
        </Link>
      </div>

      <div className="flex justify-center items-center ">
        <h1>@CopyRight DevURL</h1>
      </div>
    </div>
  );
};

export default Footer;
