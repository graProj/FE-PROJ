// ProtectedRoutes.js

import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import '../index.css';
import Header from "../components/header";
import { useEffect, useState } from "react";
import { refreshTokenIfNeeded } from "../api/login";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("rtk");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Added useLocation

  useEffect(() => {
    const checkTokenValidity = async () => {
      console.log("실행?")
      if (refreshToken) {
        try {
          
          const Info = JSON.parse(atob(refreshToken.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          const currentTime = new Date();
          if (date < currentTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('rtk');
            navigate('/auth');
          }
        } catch (error) {
        }
      }
      if (localStorageToken) {
        try {
          
          const Info = JSON.parse(atob(localStorageToken.split('.')[1]));
          
          
          const milliseconds = Info.exp * 1000;
          const date = new Date(milliseconds);
          console.log(date)
          const currentTime = new Date();
          console.log(currentTime)
          if (date - currentTime < 60 * 1000) {
            console.log(date - currentTime)
            console.log("세부사항")
            await refreshTokenIfNeeded();
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('rtk');
          navigate('/auth');
        }
      } else {
        navigate('/auth');
      }
      setIsLoading(false); 
    };

    checkTokenValidity(); 

  }, [localStorageToken, refreshToken,navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!/^\/home\/room\/.*$/.test(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;