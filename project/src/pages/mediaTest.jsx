import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


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
        <div className="w-full h-full flex justify-center items-center">
            <video ref={videoRef} autoPlay playsInline className="w-[600px] h-[400px]" />
            <h2 onClick={() => navigate(-1)} className="cursor-pointer">돌아가기</h2>
        </div>
    );
}


