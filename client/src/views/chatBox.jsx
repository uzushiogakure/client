import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomChat } from "../features/room/roomSlice";

export default function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const user = useSelector((state) => state.users.user);
  const UserId = user.id;

  const chatRoom = useSelector((state) => state.rooms.chatRoom);
  // console.log(chatRoom);

  useEffect(() => {
    dispatch(fetchRoomChat(id));
  }, []);

  const handleSend = (event) => {
    event.preventDefault();
    console.log("1");
    socket.emit("message:new", {
      RoomId: id,
      UserId,
      content: inputMessage,
    });
    setInputMessage("");
  };

  socket.on("message:update", () => {
    console.log("4");
    dispatch(fetchRoomChat(id));
  });
  return (
    <>
      <>
        <div className=" mt-10 mb-10 rounded-lg bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-2">
              {chatRoom.map((el) => {
                if (el.UserId === UserId) {
                  return (
                    <div className="flex justify-end" key={el.id}>
                      <div className="bg-yellow-300 text-black p-2 rounded-lg max-w-xs">
                        {el.content}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <>
                      <div>{el.User.name}</div>
                      <div className="flex" key={el.id}>
                        <div className="bg-yellow-500 text-black p-2 rounded-lg max-w-xs">
                          {el.content}
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <form onSubmit={handleSend}>
            <div className="bg-white p-4 flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                onChange={(event) => setInputMessage(event.target.value)}
                value={inputMessage}
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                      stroke="#ffffff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </g>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
