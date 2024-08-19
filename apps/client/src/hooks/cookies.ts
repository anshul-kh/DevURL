import { useCookies } from "react-cookie";

export const useCookie = () => {
  const [cookie, setCookie, rmCookie] = useCookies(["token", "profile"]);
  return { cookie, setCookie, rmCookie };
};
