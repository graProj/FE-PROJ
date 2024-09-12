// ProtectedRoutes.js

import { Outlet, useLocation } from "react-router-dom"; // Added useLocation
import '../index.css';
import Header from "../components/header";
import { useEffect } from "react";


const ProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const location = useLocation(); // Added useLocation
  useEffect(()=>{
    if(!token){
      window.location.hash = '/auth';
    }
  },[token])


  return (
    <>
      {!/^\/home\/room\/.*$/.test(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;