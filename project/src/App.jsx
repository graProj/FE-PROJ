import { useEffect, useState } from "react";
import { RouterProvider } from 'react-router-dom';


import router from './router';
import './index.css';
import Splash from "./pages/splash";
const App = () => {
  const [showSplashscreen, setShowSplashscreen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬스토리지에서 token 가져오기
    if (token) {
      setShowSplashscreen(!showSplashscreen);
    }
  }, []);

  return !showSplashscreen ? (
    <Splash/>
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;