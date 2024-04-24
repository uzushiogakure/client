import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";
import Chat from "../views/chatBox";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      return localStorage.getItem("access_token") ? redirect("/") : null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      return localStorage.getItem("access_token") ? redirect("/") : null;
    },
  },
  {
    path: "/room/:id",
    element: <Chat />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
  },
]);

export default router;
