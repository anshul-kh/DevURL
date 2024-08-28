import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Forget = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    if(name === "" ||  email === "" || username === "" || password === ""){
      toast.error("Invalid Fields")
      setLoading(false);
      return;
    }
    
    const param = new URLSearchParams();
    param.append("name", name);
    param.append("email", email);
    param.append("username", username);
    param.append("password",password)
    const baseURL = import.meta.env.VITE_API_URL;
    axios
      .post(`${baseURL}auth/verify`, param, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          toast(`${res.data.msg}`);
          toast("Redirecting...")
          setTimeout(() => window.location.href = "/auth/login"
            ,1500)  
        } else {
          toast(`Err: ${res.data.err}`);
        }
      })
      .catch((err) => {
        toast.error(`error :  ${err}`)
        setLoading(false)
      });
  };

  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className="w-5/6 md:w-2/6 flex bg-anti-flash_white-700 rounded-xl  justify-center items-center flex-col gap-7 py-20 drop-shadow-black drop-shadow-xl">
        <h1 className="text-3xl font-bold text-black mb-3">
          Reset Your Password
        </h1>
        <p className="opacity-50"> Note  : Your Details Except Password Must be same to set New password </p>
        <TextField
          required
          id="outlined-required"
          label="Name"
          className="w-3/4 md:w-2/4"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          className="w-3/4 md:w-2/4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Username"
          className="w-3/4 md:w-2/4"
          onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
          required
          id="outlined-required"
          label="New Password"
          className="w-3/4 md:w-2/4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="md:w-2/4 w-3/4 h-14 rounded-xl flex justify-center items-center text-anti-flash_white-700 text-xl bg-raisin_black drop-shadow-xl"
          onClick={handleVerify}
          disabled={ loading }
        >
          { loading ? "Resetting..." : "Reset" }
        </button>
      </div>
    </div>
  );
};

export default Forget;
