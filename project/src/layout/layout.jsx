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
          if (date - currentTime < 5 * 60 * 1000) {
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

    const interval = setInterval(checkTokenValidity, 300*1000);

    return () => clearInterval(interval);
  }, [localStorageToken, navigate]);

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