import React, { useEffect }  from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendImage } from "../api/sendImage";
function LectureRoom() {
    const navigate = useNavigate();
    const {id} = useParams()
    const roomId = parseInt(id, 10);
    const Info = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
    const userId = Info.Id;

    // setInterval(async () => {
    //   console.log("lectureRoom");
    //   let source = await window.display.image();
    //   sendImage(roomId, source);
    //   console.log(source);
    // }, 10000);
    useEffect(() => {
      navigate(`/home/room/L${roomId}M${userId}`);
    }, []);
    return (
        <div className="flex bg-black" >
          
        </div>
      );
    }
    
    export default LectureRoom;