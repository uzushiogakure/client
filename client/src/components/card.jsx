import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
export default function Card({ el }) {
  const navigate = useNavigate();
  return (
    <>
      {/* component */}
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg border-2 p-5">
        <div className="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          {/* <img src={data.imgUrl || "gambar"} alt="profile-picture" /> */}
        </div>
        <div className="p-6 text-center">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {el.title}
          </h4>
        </div>
        <button
          className="select-none rounded-lg bg-yellow-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
          onClick={() => {
            navigate("/chat/" + el.id);
          }}
        >
          Join
        </button>
      </div>
    </>
  );
}

Card.propTypes = {
  el: PropTypes.object,
};
