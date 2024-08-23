import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinBox from '../components/login/signup';
import Form from '../components/login/login';
import ProgressBar from '../hooks/ProgressBar';
import { Button } from '@radix-ui/themes';

export default function Splash() {
  const navigate = useNavigate();
  const [loginShow, setLoginShow] = useState(true);
  const [showSplashscreen, setShowSplashscreen] = useState(true);
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const Info = JSON.parse(atob(token.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const role = Info.auth;
          const date = new Date(milliseconds);
          const currentTime = new Date();

          if (role === 'ROLE_USER' && date > currentTime) {
            navigate('/');
          }
          else{
            localStorage.removeItem('token');
            localStorage.removeItem('rtk');
            navigate('/auth');
            window.location.reload();
          }
        } catch {
          navigate('/auth');
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashscreen(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const changeShow = () => {
    setLoginShow(!loginShow);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col justify-center items-center">
      <div className="w-1/2 h-full text-white text-2xl font-bold text-center flex flex-col items-center justify-center ">
        {showSplashscreen ? (
          <ProgressBar />
        ) : (
          loginShow ? <Form /> : <JoinBox />
        )}
        <Button
          onClick={changeShow}
          className="w-56 bg-transparent h-8 fixed bottom-10"
        >
          
          {!loginShow ? '로그인 하러가기' : '회원가입 하러가기'}
          
        </Button>
        <h4 className='text-gray-600'>학생 전용입니다.</h4>
      </div>
    </div>
  );
}