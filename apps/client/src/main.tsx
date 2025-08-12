import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home, Features, About, Auth, Profile, Dashboard, Test } from "./pages";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
import { ToastLayout } from "./layout/toast-layout";

//Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/feature",
    element: <Features />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/auth/login",
    element: <Auth path="/login" />,
  },
  {
    path: "/auth/signup",
    element: <Auth path="/signup" />,
  },
  {
    path: "/auth/forget",
    element: <Auth path="/forget" />,
  },
  {
    path: "user/:username",
    element: <Profile />,
  },
  {
    path: "/profile/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile/test",
    element: <Test />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <ToastLayout/>
        <RouterProvider router={router} />
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>,
);
