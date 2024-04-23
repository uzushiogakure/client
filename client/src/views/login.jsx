import { useState } from "react";
import Swal from "sweetalert2"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://localhost:3000"

export default function LoginPage() {

    const navigate = useNavigate()

    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    function handleInput(event) {
        const {name, value} = event.target

        setInput({
            ...input,
            [name] : value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const data = await axios({
                method: "post",
                url: BASE_URL + "/login",
                data: input
            })

            console.log(data);
            localStorage.access_token = data.data.token

            navigate("/")
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.message,
                icon: "error"
            })
        }
    }

    

  return (
    <>
      {/* component */}
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnXilfh7OpQsOP3Rz9-H1GL0UiuQ9V829fg&usqp=CAU")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="mb-2 text-2xl">UZUSHIOGAKURE</h1>
              <span className="text-gray-300">Group Chat Login</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInput}
                  placeholder="Email Address..."
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  id="password"
                  onChange={handleInput}
                  placeholder="Password..."
                />
              </div>
              <div id="buttonDiv" className="flex justify-center my-4"></div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
