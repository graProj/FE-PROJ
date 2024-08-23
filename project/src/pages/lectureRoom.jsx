import React  from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { sendImage } from "../api/sendImage";
import { Alert } from "../components/ui/alert";

function LectureRoom() {
    const navigate = useNavigate();
    const {id} = useParams()
    const roomId = parseInt(id, 10);
    const Info = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
    const userId = Info.Id;

    setInterval(async () => {
      console.log("lectureRoom");
      let source = await window.display.image();
      sendImage(roomId, source);
      console.log(source);
    }, 10000);

    return (
        <div className="flex">
          <div className="flex-1 p-5 border border-black">
            <h2>교수 화면</h2>
            <video id="peerVideo" playsInline autoPlay className="w-[300px] h-[300px]" />
          </div>
          <div className="flex-3 p-5">
            <h2>학생 화면</h2>
            <video id="myFace" playsInline autoPlay className="w-[40%] h-[30%]" />
          </div>
          <button onClick={() => { navigate(`/home/room/L${roomId}M${userId}`); }}>원격실 입장</button>
            
        </div>
      );
    }
    
    export default LectureRoom;