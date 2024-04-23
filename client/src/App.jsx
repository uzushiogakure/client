import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import Home from "./views/home";

// function AlreadyLogin() {
//     if(localStorage.access_token) return redirect("/")
//     return null
// }

// function NotLogin() {
//     if(!localStorage.access_token) return redirect("/login")
//     return null
// }

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
    // loader: AlreadyLogin
  },
  {
    path: "/register",
    element: <RegisterPage/>,
    // loader: AlreadyLogin
  },
  {
    path: "/",
    element: <Home/>,
    // loader: AlreadyLogin
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
