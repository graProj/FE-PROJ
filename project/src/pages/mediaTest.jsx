import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MediaTest() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        let cameraStream;

        async function getCameraStream() {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
            });

            if (videoRef.current) {
            videoRef.current.srcObject = cameraStream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
        }

        getCameraStream();

        return () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        };
    }, []);

    return (
        <Container>
        <video ref={videoRef} autoPlay playsInline width="600" height="400" />
        <h2 onClick={()=>navigate(-1)}>돌아가기</h2>
        </Container>
    );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    cursor: pointer;
  }
`;
