import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookie } from "../../hooks/cookies";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useCookie();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const param = new URLSearchParams();
      param.append("username", username);
      param.append("password", password);

      const baseURL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${baseURL}auth/login`, param, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setLoading(false);

      if (res?.data?.success) {
        toast.success("Login Successful!");
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        setCookie("token", res.data.token, { expires });
      } else {
        toast.error(res.data.err || "Login failed.");
      }
    } catch (err:any) {
      toast.error(
        err.response?.data?.err || `Error: ${err.message || "Something went wrong"}`
      );
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-[85vh] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-anti-flash_white-700 rounded-xl scale-90 mb-10 flex flex-col items-center gap-6 py-10 px-6 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Login With Username
        </h1>

        <TextField
          required
          label="Username"
          fullWidth
          value={username}
          className="rounded-xl"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          fullWidth
          value={password}
          className="rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full h-14 rounded-xl focus:ring-2 hover:ring-2 ring-offset-2 ring-blue-700 flex justify-center items-center text-white text-lg font-medium ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
            } shadow-lg transition-colors`}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <div className="text-lg text-gray-700 flex items-center gap-2">
          <span className="flex-1 h-px bg-gray-400"></span>
          OR
          <span className="flex-1 h-px bg-gray-400"></span>
        </div>

        <Link
          to="/auth/forget"
          className="w-full h-14 rounded-xl focus:ring-2 hover:ring-2 ring-offset-2 ring-blue-700 flex justify-center items-center text-white text-lg bg-raisin_black hover:bg-black shadow-lg transition-colors"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default Login;
