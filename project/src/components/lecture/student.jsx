import React, { useRef, useEffect } from 'react';

const Student = ({ studentId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    getMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [studentId]);

  return (
    <div>
      <h3>Student {studentId}</h3>
      <video ref={videoRef} autoPlay muted></video>
    </div>
  );
};

export default Student;