import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookie } from "../../hooks/cookies";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useCookie();
  const [loading, setLoading] = useState(false);
  
  const handleLogin = () => {
    setLoading(true);
    if(username === "" || password === "") {
      toast.error("Invalid Fields")
      setLoading(false)
      return;
    }
    
    const param = new URLSearchParams();
    param.append("username", username);
    param.append("password", password);

    const baseURL = import.meta.env.VITE_API_URL;
    axios
      .post(`${baseURL}auth/login`, param, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          toast("Login Success");
          const expires = new Date();
          expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
          setCookie("token", res.data.token, { expires });
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          toast(`${res.data.err}`);
        }
      })
      .catch((err) => {
        toast.error(`error : ${err}`)
        setLoading(false) 
      });
  };

  return (
    <div className="w-screen h-[85vh] flex justify-center items-center">
      <div className="md:w-2/6 w-5/6 flex bg-anti-flash_white-700 rounded-xl justify-center items-center flex-col gap-7 py-20 drop-shadow-black drop-shadow-xl">
        <h1 className="md:text-3xl text-2xl font-bold text-black mb-3">
          Login With Username
        </h1>
        <TextField
          required
          id="outlined-required"
          label="Username"
          className="md:w-2/4 w-3/4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password" // Secure the password field
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-3/4 md:w-2/4"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="md:w-2/4 w-3/4 h-14 rounded-xl flex justify-center items-center text-anti-flash_white-700 text-xl bg-black drop-shadow-xl"
        >
          {
          loading ? "Loggin In..." : "Log In" 
          }
        
        </button>
        <div className="text-2xl">------OR------</div>
        <Link
          to={"/auth/forget"}
          className="md:w-2/4 w-3/4 h-14 rounded-xl flex justify-center items-center text-anti-flash_white-700 text-xl bg-raisin_black drop-shadow-xl"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default Login;
