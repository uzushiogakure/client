import { useEffect, useState } from "react";
import Card from "../components/card";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000"

export default function Home() {

    const navigate = useNavigate()

    const [room, setRoom] = useState([])

    async function fetchDataRoom () {
        try {
            const data = await axios({
                method: "get",
                url: BASE_URL + "/room",
                headers: {
                    Authorization: "Bearer " + localStorage.access_token
                }
            })
            setRoom(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchDataRoom()
    }, [])

    async function handleJoin(id) {
        try {
            await axios({
                method: "post",
                url: BASE_URL + "room/" + id,
                headers: {
                    Authorization: "Bearer " + localStorage.access_token
                }
            })
            Swal.fire({
                title: "Successfully join",
                icon: "success"
            })
            navigate("/chat")
            
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
      <div className="flex flex-row ...">
        <div className="flex flex-wrap ...">
            {room.map((el)=> {
                <Card el={el} handleJoin={handleJoin}/>
            })}
        </div>
      </div>
    </>
  );
}
