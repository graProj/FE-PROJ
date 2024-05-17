// ProtectedRoutes.js

import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import '../index.css';
import Header from "../components/header";
import { useEffect, useState } from "react";
import { refreshTokenIfNeeded } from "../api/login";

const ProtectedRoutes = () => {
  const location = useLocation();
  const localStorageToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (localStorageToken) {
        try {
          const Info = JSON.parse(atob(localStorageToken.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          const currentTime = new Date();
          // 토큰 만료 5분 전에만 재발급 시도
          if (date - currentTime < 5 * 60 * 1000 && currentTime - lastRefreshTime > 5 * 60 * 1000) {
            await refreshTokenIfNeeded();
            setLastRefreshTime(Date.now()); // 마지막 갱신 시간 업데이트
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          navigate('/auth');
        }
      } else {
        navigate('/auth');
      }
      setIsLoading(false); 
    };

    checkTokenValidity(); 

    const interval = setInterval(checkTokenValidity, 300*1000);

    return () => clearInterval(interval);
  }, [localStorageToken]);

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
