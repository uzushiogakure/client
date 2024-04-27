import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";
import Chat from "../views/chatBox";
import Home from "../views/home";
import Layout from "../layouts";
import Layout_landing from "../layouts/layout-landing";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <Layout_landing />,
    loader: () => {
      return localStorage.getItem("access_token") ? redirect("/") : null;
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
    element: <Layout />,
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
