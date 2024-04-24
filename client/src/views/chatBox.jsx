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
              ></button>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
