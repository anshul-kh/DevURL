import { useState } from "react";
import { toast } from "react-toastify";
import hash from "password-hash";

export const useEncrypt = () => {
  const [password, setPass] = useState<string | null>(null);

  const setPassword = (pass: string) => {
    const hashedPassword = hash.generate(pass);
    console.log(hashedPassword);
    if (!pass || !hashedPassword) {
      toast.error("password hashing failed");
      window.location.href = "/";
    } else {
      setPass(hashedPassword);
    }
  };

  return { password, setPassword };
};
