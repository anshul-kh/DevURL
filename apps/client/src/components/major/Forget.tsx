import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Forget = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);

    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const param = new URLSearchParams();
      param.append("name", name);
      param.append("email", email);
      param.append("username", username);
      param.append("password", password);

      const baseURL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${baseURL}auth/verify`, param, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setLoading(false);

      if (res.data.success) {
        toast.success(res.data.msg || "Password reset successful.");
        setTimeout(() => (window.location.href = "/auth/login"), 1500);
      } else {
        toast.error(res.data.err || "Password reset failed.");
      }
    } catch (err:any) {
      toast.error(
        err.response?.data?.err || `Error: ${err.message || "Something went wrong"}`
      );
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center px-4">
      <div className="max-w-xl bg-anti-flash_white-700 rounded-xl flex flex-col scale-90 items-center gap-6 py-4 px-6 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
          Reset Your Password
        </h1>
        <p className="text-sm text-red-700 text-center">
          Note: Your details (except password) must match your registered
          account to set a new password.
        </p>

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
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full h-14 rounded-xl flex justify-center items-center text-white text-lg font-medium ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-raisin_black hover:bg-black"
          } shadow-lg transition-colors`}
        >
          {loading ? "Resetting..." : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default Forget;
