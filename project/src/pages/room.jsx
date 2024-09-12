import React, { useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Button } from "../components/ui/button";

export default function Room() {
  const socket = io("http://3.38.214.160:5004");
  const { remoteId } = useParams();
  
  const navigate = useNavigate();
  const room = `${ remoteId}`;
  const configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  const resizeExecuted = useRef(false);

  // if (!resizeExecuted.current) {
  //   window.display.resize();
  //   resizeExecuted.current = true;
  // }
  let myPeerConnection = new RTCPeerConnection(configuration);

  let offer = null;
  let answer = null;
  let stream = null;
  let source = null;
  let peerVideo = null;
  const goBack = ()=>{
    navigate('/');
    window.display.default();
    window.location.reload();
  }
  useEffect(() => {
    
    getMedia();
    myPeerConnection.addEventListener("iceconnectionstatechange", handleConnectionStateChange);
    return () => {
      if (myPeerConnection) {
        myPeerConnection.close();
        myPeerConnection = null;
      }
    };
  }, []);
  function handleConnectionStateChange() {
    if (myPeerConnection.iceConnectionState === "disconnected" && peerVideo!==null) {
      console.log("Peer connection lost. Reloading page.");
      window.location.reload();
    }
  }
  myPeerConnection.addEventListener("addstream", handleAddStream);

  myPeerConnection.onicecandidate = function(event) {
    
    console.log("Send Candidate");
    Send({
        event: "candidate",
        data: event.candidate
    })
  }

  function handleAddStream(data) {
    console.log("Receive Streaming Data!");
    peerVideo = document.getElementById("peerVideo");
    peerVideo.srcObject = data.stream;
  }
  if (myPeerConnection.iceConnectionState === "disconnected" && peerVideo.srcObject!==null) {
    window.location.reload();
    peerVideo.srcObject=null
  }
  async function Send(message) {
    const data = {
      roomId: room,
      ...message,
    };
    socket.emit("rtc-message", JSON.stringify(data));
  }

  async function getMedia() {
    try {
      console.log("first");
      socket.emit("join-slave", room);

      socket.on("room-full", async (message) => {
        alert("입장 인원 초과");
        window.location.reload(true);
      });

      socket.on("rtc-message", async (message) => {
        var content = JSON.parse(message);
        console.log("메시지");

        if (content.event === "offer") {
          console.log("Receive Offer", content.data);
          offer = content.data;
          await myPeerConnection.setRemoteDescription(offer);
          console.log("source : ",source)
          if (!source) {
            source = await window.display.source();
          }
    
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: source,
                minWidth: 1920, // 해상도 높이기
                maxWidth: 1920, // 해상도 높이기
                minHeight: 1080, // 해상도 높이기
                maxHeight: 1080, // 해상도 높이기
              },

            },

          });
    
          const myFace = document.getElementById("myFace");
          myFace.srcObject = stream;

          stream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, stream));
          answer = await myPeerConnection.createAnswer();
          await myPeerConnection.setLocalDescription(answer);
          console.log("Send Answer");
          Send({
            event: "answer",
            data: answer,
          });
        } else if (content.event === "answer") {
          console.log("Receive Answer");
          answer = content.data;
          await myPeerConnection.setRemoteDescription(answer);
        } else if (content.event === "candidate") {
          await myPeerConnection.addIceCandidate(content.data);
        } else if (content.event === "client_x_coordinate") {
          var xCoordinate = content.data;
          const remoteX = (xCoordinate.x * window.screen.width) / 1000;
          const remoteY = (xCoordinate.y * window.screen.height) / (1000 * (window.screen.height / window.screen.width));
          console.log("Received client's X coordinate:", remoteX, remoteY);
          window.remote.source(remoteX, remoteY);
        }
      });
      socket.on("remote-event", async (message) => {
        var content = JSON.parse(message);
        
        if (content.event === "client_x_coordinate") {
          if (content.data.eventType==='mousemove'||content.data.eventType==='mouseup'||content.data.eventType==='mousedown'||content.data.eventType==='right-mouseup'||content.data.eventType==='right-mousedown') {
            await window.remote.source(content.data.x, content.data.y, content.data.eventType);
          }
          else if(content.data.eventType==='keyup'){
            await window.remote.keyup(content.data.key);
          }
          else if(content.data.eventType==='keydown'){
            await window.remote.keydown(content.data.key);
          }
        }
      });
      socket.on('kick', async (data) => {
        navigate(-1);
      })
      socket.on('disconnect', () => {
      });

    // 시작부터 연결이 안될 경우
      socket.on('connect_error', function() {
        navigate(-1);
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }


  return (
    <div id="box" className="relative bottom-0 left-0 w-screen h-screen bg-black">
      <div id="result"></div>
      <video id="myFace" playsInline autoPlay width="600" height="600" className="hidden"></video>
      <Button onClick={goBack}>돌아가기</Button>
      <video id="peerVideo" playsInline autoPlay width="200" height="200" ></video>
    </div>
  );
}