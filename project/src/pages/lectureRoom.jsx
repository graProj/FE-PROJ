import React  from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { sendImage } from "../api/sendImage";
import { Alert } from "../components/ui/alert";

function LectureRoom() {

    const {id} = useParams()
    const openNewWindow = (relativeUrl) => {
      if (window.electron) {
        window.electron.openNewWindow(relativeUrl);
      } else {
        console.error('Electron API not available');
      }
    };
    const roomId = parseInt(id, 10);
    const Info = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
    const userId = Info.Id;

    setInterval(async () => {
      let source = await window.display.image();
      sendImage(roomId, source);
      console.log(source);
    }, 8000);

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
          <button onClick={() => { openNewWindow(`/home/room/L${roomId}M${userId}`); }}>원격실 입장</button>
          <Alert
              showicon={<h2>원격실 입장</h2>}
              title={` 원격실에 참여하시겠습니까?`}
              context={'교수님의 원격제어를 허용하게됩니다.'}
              
            />
            
        </div>
      );
    }
    
    export default LectureRoom;