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
  

  return (
    <>
      <div className={`h-12 flex justify-between px-4 items-center border-b-2 `}>
        <a className="w-1/5 cursor-pointer" href='/'>
          <img src="/logo.png" alt="awef" width={60} />
        </a>
        <div className="w-2/5 h-full flex items-center justify-end">
          <Button onClick={logout}>로그아웃</Button>
        </div>
      </div>
    </>
  );
}