import { Button } from '@radix-ui/themes';
import React from 'react';
import { useNavigate} from 'react-router-dom';


export default function Header() {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rtk');
    navigate('/auth');
  }
  const goHome = () =>{
    navigate('/')
    window.location.reload();
  }
  const close = ()=>{
    window.setting.close();
  }
  return (
    <>
      <div className={`h-12 flex justify-between px-4 items-center border-b-2 `}>
        <div className='cursor-pointer' onClick={goHome}>
          <img src='logo.png' alt="awef" width={60} />
        </div>
        <div className="w-2/5 h-full flex items-center justify-end">
          <Button onClick={logout}>로그아웃</Button>
          <Button onClick={close}>종료</Button>
        </div>
      </div>
    </>
  );
}