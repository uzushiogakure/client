import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { register } from "../features/user/userSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
  })

  function handleInput(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(register(input));

      Swal.fire({
        title: "Successfully Registered",
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };

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
              <span className="text-gray-300">Group Chat Register</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInput}
                  placeholder="Name"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInput}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  id="password"
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
