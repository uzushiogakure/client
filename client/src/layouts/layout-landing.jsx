import { Outlet } from "react-router-dom";
import Navbar_landing from "../components/navbar-landing";

export default function Layout_landing() {
  return (
    <>
      <Navbar_landing/>
      <Outlet />
    </>
  );
}