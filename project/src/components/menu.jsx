import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Menu({ isclose }) {
  const close = isclose === 'false' || isclose === false;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rtk');
    navigate('/auth');
  }

  return (
    <div className={`fixed top-0 left-0 h-full w-[35%] bg-[#040d12d8] flex flex-col items-between p-5 text-white text-center z-[99] ${close ? 'hidden' : ''}`}>
      <h1 className="text-2xl p-5">메 뉴</h1>
      
      <div className="w-full h-[80vh] flex flex-col">
        <h3 className="cursor-pointer" onClick={logout}>로그아웃</h3>
        <h3 className="cursor-pointer" onClick={() => navigate('/home/info')}>회원정보 수정</h3>
        <h3 className="cursor-pointer" onClick={() => navigate('/home/testroom')}>카메라 테스트</h3>
        <h3 className="cursor-pointer">awef</h3>
      </div>
    </div>
  );
}