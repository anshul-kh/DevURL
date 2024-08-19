import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookie } from "../../hooks/cookies";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useCookie();

  const location = useLocation();

  const handleSignup = () => {
    const param = new URLSearchParams();
    param.append("name", name);
    param.append("email", email);
    param.append("username", username);
    param.append("password", password);

    const baseURL = import.meta.env.VITE_API_URL;
    axios
      .post(`${baseURL}auth/signup`, param, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res) {
          if (res.data.success === true) {
            const expires = new Date();
            expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
            setCookie("token", res.data.token, { expires });
            toast("User is Created");
            setTimeout(() => (window.location.href = "/"), 1000);
          } else {
            toast(`Error: ${res.data.err}`);
          }
        } else {
          toast(`Unexpected error`);
        }
      })
      .catch((e) => toast(`Error : ${e}`));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uname: string | null = queryParams.get("username");
    if (uname) setUsername(uname);
  }, [location]);

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className="w-5/6 md:w-5/12 flex bg-anti-flash_white-700 rounded-xl  justify-center items-center flex-col gap-5 md:gap-7 py-5 md:py-16 drop-shadow-black drop-shadow-xl">
        <h1 className="text-3xl font-bold text-black mb-3">
          Create An Account
        </h1>
        <TextField
          required
          id="name"
          label="Name"
          value={name}
          className="w-3/4 md:w-2/4"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          id="email"
          label="Email"
          value={email}
          className="w-3/4 md:w-2/4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          id="username"
          label="Username"
          value={username}
          className="w-3/4 md:w-2/4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          id="password"
          label="Password"
          type="password" // Ensure the password input is obscured
          value={password}
          className="w-3/4 md:w-2/4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-3/4 md:w-2/4 ronded-lg h-14 rounded-xl flex justify-center items-center text-anti-flash_white-700 text-xl bg-black drop-shadow-xl"
        >
          Submit
        </button>
        <div className="text-2xl">------OR------</div>
        <Link
          to={"/auth/login"}
          className="w-3/4 md:w-2/4 ronded-lg h-12 rounded-xl flex justify-center items-center text-anti-flash_white-700 text-xl bg-raisin_black drop-shadow-xl"
        >
          Already Have An Account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
