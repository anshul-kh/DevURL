import { Forget, Login, NavBar, Signup } from "../components";

const Auth = ({ path }: { path: string }) => {
  return (
    <div>
      <NavBar />
      {path === "/login" && <Login />}

      {path === "/signup" && <Signup />}

      {path === "/forget" && <Forget />}
    </div>
  );
};

export default Auth;
