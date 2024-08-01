import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
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
            <Container>
                <ProfessorContainer>
                    <h2>교수 화면</h2>
                    <video id="peerVideo" playsInline autoPlay width="300" height="300"/>
                </ProfessorContainer>
                <GridContainer>
                    <h2>학생 화면</h2>
                    <video id="myFace" playsInline autoPlay width="40%" height="30%" />
                    
                </GridContainer>
                <ChatContainer>
                    <ChatButton onClick={toggleChat}>{isChatOpen ? "채팅 비활성화" : "채팅 활성화"}</ChatButton>
                    <ChatBox isopen={isChatOpen}>
                        <ChatInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지 입력..."
                        />
                        <SendButton onClick={()=>SendMessage(input)}>전송</SendButton>
                        <div id="chatBox"></div>
                    </ChatBox>
                </ChatContainer>
            </Container>
        );
    };
    export default LectureRoom;

    const Container = styled.div`
        display: flex;
    `;

    const ProfessorContainer = styled.div`
        flex: 1;
        padding: 20px;
        border: 1px solid black;
    `;

    const GridContainer = styled.div`
        flex: 3;
        padding: 20px;
    `;

    const ChatContainer = styled.div`
        flex: 1;
        padding: 20px;
    `;

    const ChatButton = styled.button`
        color: black;
        border: black;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    `;

    const ChatBox = styled.div`
        display: ${({ isopen }) => (isopen ? 'block' : 'none')};
        border: 1px solid black;
    `;
    const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    `;
    const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    `;


