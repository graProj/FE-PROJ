import React, { useEffect }  from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendImage } from "../api/sendImage";
import { refreshTokenIfNeeded } from "../api/login";

function LectureRoom() {
    const localStorageToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const {id} = useParams()
    const roomId = parseInt(id, 10);
    const Info = JSON.parse(atob(localStorageToken.split('.')[1]));
    const userId = Info.Id;

    const checkTokenValidity = async () => {
      if (localStorageToken) {
        try {
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          const currentTime = new Date();
          if (date - currentTime < 60 * 1000) {
            await refreshTokenIfNeeded();
          }
          else return;
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('rtk');
          navigate('/auth');
          window.location.reload();
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('rtk');
        navigate('/auth');
        window.location.reload();
      }
    };
    setInterval(async () => {
      checkTokenValidity();
      let source = await window.display.image();
      sendImage(roomId, source);
    }, 10000);
    useEffect(() => {
      navigate(`/home/room/L${roomId}M${userId}`);
    }, []);
    return (
        <div className="flex bg-black" >
          aa
        </div>
      );
    }
    
    export default LectureRoom;