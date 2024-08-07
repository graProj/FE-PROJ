import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { sendImage } from "../api/sendImage";

function LectureRoom() {
    const socket = io("http://3.39.22.211:5004/");
    const {roomid} = useParams()
    const room = `${roomid}`;
    const configuration = {
        iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
        ],
    };
    const [input, setInput] = useState('');
    const myPeerConnection = new RTCPeerConnection(configuration);
    async function Send(message) {
        const data = {
        roomId: room,
        ...message,
        };
        socket.emit("rtc-message", JSON.stringify(data));
    }
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    
    var stream;

    myPeerConnection.onicecandidate = function (event) {
        console.log("Send Candidate");
        console.log(event.candidate);
        Send({
        event: "candidate",
        data: event.candidate,
        });
        
    };
    

    const Send2 = async (message) => {
        const data = { roomId: room, ...message };
        socket.emit("remote-event", JSON.stringify(data));
      };
    
      const sendClientXCoordinate = (xCoordinate) => {
        Send2({ event: "chatting", data: xCoordinate });
      };
      var stream;
    const SendMessage = (e) => {
        // 마우스 업 시점의 좌표를 전송
        sendClientXCoordinate({e});
        setInput('')
      };
    const getMedia = async () => {
        try {
        console.log("first");
        socket.emit("join-master", room);

        socket.on("room-full", async (message) => {
            alert("입장 인원 초과");
            window.location.reload(true);
        });

        socket.on("rtc-message", async (message) => {
            var content = JSON.parse(message);
            console.log("메시지");

            if (content.event === "offer") {
                console.log("Receive Offer", content.data);
                var offer = content.data;
                await myPeerConnection.setRemoteDescription(offer);
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                const myFace = document.getElementById("myFace");
                myFace.srcObject = stream;
                stream
                    .getTracks()
                    .forEach((track) => myPeerConnection.addTrack(track, stream));
                var answer = await myPeerConnection.createAnswer();
                console.log("Send Answer");
                await myPeerConnection.setLocalDescription(answer);
                Send({
                    event: "answer",
                    data: answer,
                });
            } 
            else if (content.event === "answer") {
                console.log("Receive Answer");
                var answer = content.data;
                await myPeerConnection.setRemoteDescription(answer);
            } 
            else if (content.event === "candidate") {
                console.log("Receive Candidate");
                await myPeerConnection.addIceCandidate(content.data);
            }
            else if (content.event === "chat-message") {
                console.log("chat-message");
                await myPeerConnection.addIceCandidate(content.data);
            }
        });
        socket.on("remote-event", async (message) => {
            var content = JSON.parse(message);
        
        if (content.event === "chatting") {
            console.log(content.data)
            const chatBox = document.getElementById("chatBox");
            const messageNode = document.createElement("div");
            messageNode.textContent = content.data.e;
            chatBox.appendChild(messageNode);
        }   
        });

        } catch (error) {
        console.error("Error accessing media devices:", error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);
    setInterval(async () => {
        let source = await window.display.image();
        sendImage(92,`data:image/jpeg;base64,${source}`);
        console.log(source)
      }, 3000);
    myPeerConnection.addEventListener("addstream", handleAddStream);

    function handleAddStream(data) {
        console.log("Receive Streaming Data!");
        var peerVideo = document.getElementById("peerVideo");
        peerVideo.srcObject = data.stream;
    }
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
          <div className="flex-1 p-5">
            <button
              onClick={toggleChat}
              className="text-black border-black p-2.5 px-5 rounded cursor-pointer"
            >
              {isChatOpen ? "채팅 비활성화" : "채팅 활성화"}
            </button>
            <div className={`${isChatOpen ? 'block' : 'hidden'} border border-black`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지 입력..."
                className="flex-1 p-2.5 border border-gray-300 rounded mr-2.5"
              />
              <button
                onClick={() => SendMessage(input)}
                className="p-2.5 px-5 bg-blue-500 text-white border-none rounded cursor-pointer"
              >
                전송
              </button>
              <div id="chatBox"></div>
            </div>
          </div>
        </div>
      );
    }
    
    export default LectureRoom;