import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";
import Chat from "../views/chatBox";
import Home from "../views/home";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <Outlet />,
    loader: () => {
      return localStorage.getItem("access_token") ? redirect("/home") : null;
    },
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Outlet />,
    loader: () => {
      return !localStorage.getItem("access_token")
        ? redirect("/user/login")
        : null;
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "chat/:id",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
