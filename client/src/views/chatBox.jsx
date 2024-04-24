import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomChat } from "../features/room/roomSlice";

export default function Chat() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const UserId = useSelector((state) => state.users.data.id);
  const chatRoom = useSelector((state) => state.rooms.data);

  useEffect(() => {
    dispatch(fetchRoomChat(id));
  }, []);

  const handleSend = (event) => {
    event.preventDefault();

    socket.emit("message:new", {
      RoomId: id,
      UserId,
      content: inputMessage,
    });
    setInputMessage("");
  };

  socket.on("message:update", () => {
    dispatch(fetchRoomChat(id));
  });
  return (
    <>
      <>
        <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-2">
              {chatRoom.map((el) => {
                if (el.User.id == UserId) {
                  <div className="flex justify-end">
                    <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                      {el.content}
                    </div>
                  </div>;
                } else {
                  <div className="flex">
                    <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                      {el.content}
                    </div>
                  </div>;
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
                className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
              ></button>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
