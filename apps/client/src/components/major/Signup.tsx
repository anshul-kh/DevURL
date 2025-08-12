import { TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookie } from "../../hooks/cookies";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useCookie();
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const param = new URLSearchParams();
      param.append("name", name);
      param.append("email", email);
      param.append("username", username);
      param.append("password", password);

      const baseURL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${baseURL}auth/signup`, param, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (res.data.success) {
        const expires = new Date();
        expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
        setCookie("token", res.data.token, { expires });
        toast.success("Account created successfully!");
        setTimeout(() => (window.location.href = "/"), 1000);
      } else {
        toast.error(res.data.err || "Signup failed.");
      }
    } catch (err:any) {
      toast.error(
        err.response?.data?.err || `Error: ${err.message || "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uname = queryParams.get("username");
    if (uname) setUsername(uname);
  }, [location]);

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center px-4">
      <div className="w-full max-w-xl scale-75 bg-anti-flash_white-700 rounded-xl flex flex-col items-center gap-6 py-10 px-6 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
          Create An Account
        </h1>

        <TextField
          required
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full h-14 rounded-xl flex justify-center items-center text-white text-lg font-medium transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-raisin_black"
          } shadow-lg`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <div className="text-lg text-gray-500">------ OR ------</div>

        <Link
          to="/auth/login"
          className="w-full h-12 rounded-xl flex justify-center items-center text-white text-lg bg-raisin_black hover:bg-black shadow-lg transition-colors"
        >
          Already Have An Account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
