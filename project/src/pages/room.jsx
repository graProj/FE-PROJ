import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Room() {
  const socket = io("http://3.39.22.211:5004/");
  const navigate = useNavigate();
  const room = "didacto3";
  const configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  let myPeerConnection = new RTCPeerConnection(configuration);
  let offer = null;
  let answer = null;
  let stream = null;
  let source = null;
  useEffect(() => {
    getMedia();
  }, []);
  window.addEventListener("beforeunload", function () {
    if (myPeerConnection && myPeerConnection.connectionState !== "closed") {
      myPeerConnection.close();
      console.log("연결끊음");
    }
  });
  myPeerConnection.addEventListener("addstream", handleAddStream);

  function goRoom() {
    navigate(-1);
  }
  function handleAddStream(data) {
    console.log("Receive Streaming Data!");
    var peerVideo = document.getElementById("peerVideo");
    peerVideo.srcObject = data.stream;
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
          if (!source) {
            source = await window.display.source();
          }

          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: source,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720,
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
          const remoteX = (xCoordinate.x * window.screen.width) / 700;
          const remoteY =
            (xCoordinate.y * window.screen.height) /
            (700 * (window.screen.height / window.screen.width));
          console.log("Received client's X coordinate:", remoteX, remoteY);
          window.remote.source(remoteX, remoteY);
        }
      });
      socket.on("remote-event", async (message) => {
        var content = JSON.parse(message);

        if (content.event === "client_x_coordinate") {
          if (typeof content.data === "object") {
            console.log(content.data);
            await window.remote.source(
              content.data.x,
              content.data.y,
              content.data.eventType
            );
          } else {
            await window.remote.key(content.data);
          }
        }
      });
      socket.on("kick", async () => {
        navigate(-1);
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }

  return (
    <div className="fixed top-0 left-0 bg-white">
      <Button onClick={goRoom}>나가기</Button>
      <div id="result"></div>
      <input type="text" />
      <video
        id="myFace"
        playsInline
        autoPlay
        width="600"
        height="600"
        className="w-600 h-600"
      ></video>
      <a href="/">Home</a>
      <video
        id="peerVideo"
        playsInline
        autoPlay
        width="40%"
        height="30%"
        className="w-2/5 h-1/3"
      ></video>
    </div>
  );
}