import { Forget, Login, Signup } from "../components";
import DefaultLayout from "../layout/default";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../hooks/cookies";

const Auth = ({ path }: { path: string }) => {

  const navigate = useNavigate();
  const {cookie} = useCookie();

  cookie.token && navigate("/");

  return (
    <DefaultLayout className="w-full h-screen bg-flash_white overflow-x-hidden no-scrollbar">
      {path === "/login" && <Login />}

      {path === "/signup" && <Signup />}

      {path === "/forget" && <Forget />}
    </DefaultLayout>
  );
};

export default Auth;
