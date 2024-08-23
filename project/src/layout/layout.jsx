// ProtectedRoutes.js

import { Outlet, useNavigate } from "react-router-dom";
import '../index.css';
import Header from "../components/header";
import { useEffect, useState } from "react";
import { refreshTokenIfNeeded } from "../api/login";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("rtk");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    
    const checkTokenValidity = async () => {
      if (refreshToken) {
        try {
          const Info = JSON.parse(atob(refreshToken.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          const currentTime = new Date();
          // 토큰 만료 5분 전에만 재발급 시도
          if ( date < currentTime ) {
            localStorage.removeItem('token');
            localStorage.removeItem('rtk');
            navigate('/auth');
          }
        } catch (error) {
        }
      }
      setIsLoading(false); 
    };

    checkTokenValidity(); 

    const interval = setInterval(checkTokenValidity, 300*1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (localStorageToken) {
        try {
          const Info = JSON.parse(atob(localStorageToken.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          const currentTime = new Date();
          // 토큰 만료 5분 전에만 재발급 시도
          if (date - currentTime < 5 * 60 * 1000) {
            await refreshTokenIfNeeded();
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('rtk');
          navigate('/auth');
        }
      }
       else {
        navigate('/auth');
      }
      setIsLoading(false); 
    };

    checkTokenValidity(); 

    const interval = setInterval(checkTokenValidity, 300*1000);

    return () => clearInterval(interval);
  }, [localStorageToken,navigate]); // Added missing dependencies

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;