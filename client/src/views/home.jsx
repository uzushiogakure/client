import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoom } from "../features/room/roomSlice";
import Card from "../components/card";

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rooms.listRoom);

  useEffect(() => {
    dispatch(fetchAllRoom());
  }, []);

  // console.log(data);
  return (
    <>
      <div className="flex flex-row ...">
        <div className="flex flex-wrap ...">
          {data.map((el) => {
            return <Card key={el.id} el={el} />;
          })}
        </div>
      </div>
    </>
  );
}
