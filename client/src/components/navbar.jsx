import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate()
  return (
    <>
      {/* component */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>UZUSHIOGAKURE</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <nav className="w-screen bg-amber-500 h-fit overflow-hidden">
        <div className="py-4 lg:px-8 px-4 max-w-[1280px] h-16 m-auto text-white flex items-center justify-between">
          <div>
            <h1 className="lg:text-2xl text-xl uppercase tracking-wider cursor-pointer font-bold" onClick={()=> {navigate("/")}}>
              Group Chat
            </h1>
          </div>
          <div
            className="flex lg:gap-8 gap-6 uppercase tracking-wider cursor-pointer text-lg items-center"
            id="navItems"
          >
            <span className="group">
              Services
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500" />
            </span>
            <span className="group">
              About
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500" />
            </span>
            <span className="group" onClick={()=> {localStorage.clear(); navigate("/user/login")}}>
              Logout
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500" />
            </span>
          </div>
          <div
            id="hamburger"
            className="fa fa-bars flex items-center text-xl"
            style={{ display: "none" }}
          />
          <div
            id="mobileNav"
            className="fixed flex flex-col gap-8 pt-16 px-4 text-xl uppercase bg-teal-500 h-full inset-0 top-16 w-[70%] left-[-70%] ease-in-out duration-500 cursor-pointer"
          >
            <span>Services</span>
            <span>About</span>
            <span>Logout</span>
          </div>
        </div>
      </nav>
    </>
  );
}
