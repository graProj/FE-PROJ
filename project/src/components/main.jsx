import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Home() {
  const socket = io("http://3.39.22.211:5004/");
  const room = "didacto3";
  const configuration = {
    iceServers: [
      {
        url: "stun:stun.l.google.com:19302",
      },
    ],
  };
  const myPeerConnection = new RTCPeerConnection(configuration);
  async function Send(message) {
    const data = {
      roomId: room,
      ...message,
    };
    socket.emit("rtc-message", JSON.stringify(data));
  }
  let stream;
  let source;
  myPeerConnection.onicecandidate = function (event) {
    console.log("Send Candidate");
    console.log(event.candidate);
    Send({
      event: "candidate",
      data: event.candidate,
    });
  };
  const getMedia = async () => {
    try {
      console.log("first");
      // Socket Room Join
      socket.emit("join-master", room);
      // Room Join -> 이미 접속한 Master 존재
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
          myPeerConnection.setRemoteDescription(offer); //Offer -> Remote Description 등록
          // 오퍼를 받는 쪽 -> 상대에게 자신의 미디어 트랙을 추가시켜줌
          await getMedia();
          stream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, stream));
          var answer = await myPeerConnection.createAnswer();
          console.log("offer");
          myPeerConnection.setLocalDescription(answer); //LocalDescription 설정 -> onicecandidate 트리거 -> Candidate를 Socket에 Answer로 보냄
          console.log("Send Answer");
          Send({
            event: "answer",
            data: answer,
          });
        } else if (content.event === "answer") {
          console.log("Receive Answer");
          answer = content.data;
          console.log(answer);
          myPeerConnection.setRemoteDescription(answer);
        } else if (content.event === "candidate") {
          console.log("Receive Candidate");
          myPeerConnection.addIceCandidate(content.data);
        }
      });
      console.log(await window.display.source())
      const myFace = document.getElementById("myFace");
      if(!source){source = await window.display.source() }
      
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          }
        }
      });
 
      myFace.srcObject = stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };
  async function createOffer() {
    //myStream에 미디어 정보 저장
    await getMedia();
    // getMedia에서 가져온 트랙을 myPeerConnection에 등록
    stream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, stream));
    // RTC Peer Connection으로 Offer 생성
    var offer = await myPeerConnection.createOffer();
    // 시그널링 서버로 Offer 전송
    await Send({
      event: "offer",
      data: offer,
    });
    console.log("Send Offer");
    myPeerConnection.setLocalDescription(offer);
  }
  myPeerConnection.addEventListener("addstream", handleAddStream);
  function handleAddStream(data) {
    console.log("Receive Streaming Data!");
    var peerVideo = document.getElementById("peerVideo");
    peerVideo.srcObject = data.stream;
  }
  useEffect(() => {
    createOffer();
   
  }, []);
  return (
    <div id="box">
      <div id="result"></div>
      <video id="myFace" playsInline autoPlay width="600" height="600"></video>
      <a href="/">Home</a>
      <video
        id="peerVideo"
        playsInline
        autoPlay
        width="40%"
        height="30%"
      ></video>
    </div>
  );
}