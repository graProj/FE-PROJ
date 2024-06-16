import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

export default function Room() {
  const navigate = useNavigate()
  const socket = io("http://3.39.22.211:5004/");
  const room = "didacto3";
  const configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  let myPeerConnection = null;
  let offer = null;
  let answer = null;
  let screenStream = null;
  let cameraStream = null;
  let source = null;

  useEffect(() => {
    initializePeerConnection();

    return () => {
      if (myPeerConnection) {
        myPeerConnection.close();
        myPeerConnection = null;
      }
    };
  }, []);

  function initializePeerConnection() {
    myPeerConnection = new RTCPeerConnection(configuration);

    myPeerConnection.onicecandidate = function (event) {
      console.log("Send Candidate");
      console.log(event.candidate);
      Send({
        event: "candidate",
        data: event.candidate,
      });
    };

    myPeerConnection.addEventListener("addstream", handleAddStream);

    window.addEventListener("beforeunload", function () {
      if (myPeerConnection && myPeerConnection.connectionState !== 'closed') {
        myPeerConnection.close();
        console.log("연결끊음")
      }
    });

    createOffer();
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
          await getMedia();
          screenStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, screenStream));
          cameraStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, cameraStream));
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
          console.log("Receive Candidate");
          await myPeerConnection.addIceCandidate(content.data);
        } else if (content.event === "client_x_coordinate") {
          var xCoordinate = content.data;
          const remoteX = (xCoordinate.x * window.screen.width) / 700;
          const remoteY = (xCoordinate.y * window.screen.height) / (700 * (window.screen.height / window.screen.width));
          console.log("Received client's X coordinate:", remoteX, remoteY);
          window.remote.source(remoteX, remoteY);
        }
      });
      socket.on("remote-event", async (message) => {
        var content = JSON.parse(message);
        
        if (content.event === "client_x_coordinate") {
          if (typeof content.data === 'object') {
            console.log(content.data)
            await window.remote.source(content.data.x, content.data.y, content.data.eventType);
          } else  {          
            await window.remote.key(content.data);
          }
          
        }
      });
      socket.on('kick', async (data) => {
        navigate(-1);
      })
      socket.on('disconnect', () => {
        navigate(-1);
      });

    // 시작부터 연결이 안될 경우
      socket.on('connect_error', function() {
        navigate(-1);
      });
      console.log(await window.display.source());
      if (!source) {
        source = await window.display.source();
      }

      // 화면 공유 캡처
      screenStream = await navigator.mediaDevices.getUserMedia({
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

      // 카메라 캡처
      cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const screenVideo = document.getElementById("screenVideo");
      screenVideo.srcObject = screenStream;

      const cameraVideo = document.getElementById("cameraVideo");
      cameraVideo.srcObject = cameraStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }

  async function createOffer() {
    await getMedia();
    cameraStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, cameraStream));
    screenStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, screenStream));
    offer = await myPeerConnection.createOffer();
    await Send({
      event: "offer",
      data: offer,
    });
    console.log("Send Offer: ", offer);
    await myPeerConnection.setLocalDescription(offer);
  }

  return (
    <div id="box">
      <div id="result"></div>
      <input type="text" />
      <div style={{ position: "relative" }}>
        <video id="screenVideo" playsInline autoPlay width="700" ></video>
        <video id="cameraVideo" playsInline autoPlay width="150" height="150" style={{ position: "absolute", top: "10px", right: "10px" }}></video>
      </div>
      <a href="/">Home</a>
      <video id="peerVideo" playsInline autoPlay width="40%" height="30%"  style={{ zIndex: 99}}></video>
    </div>
  );
}
