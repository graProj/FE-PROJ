import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { sendImage } from "../api/sendImage";

function LectureRoom() {

    const {id} = useParams()

    const roomId = parseInt(id, 10);

    setInterval(async () => {
        let source = await window.display.image();
        sendImage(roomId,`data:image/jpeg;base64,${source}`);
        console.log(source)
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
        </div>
      );
    }
    
    export default LectureRoom;