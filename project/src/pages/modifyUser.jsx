import React, { useState } from 'react';
import LoadingIndicator from '../hooks/loading';
import { Modify } from '../api/user';
import { useNavigate } from 'react-router-dom';


export default function ModifyUser() {
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    birth:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // 폼 제출 시 로딩 상태를 true로 변경합니다.
      await Modify(formData,setIsLoading);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 상태를 다시 false로 변경합니다.
    }
  };
  return (
    <div className="w-screen h-[70vh] text-center text-2xl">
      <form onSubmit={handleSubmit} className="pt-5 flex flex-col justify-between items-center w-full h-full">
        <h2 className="mb-4">회원정보 수정</h2>
        <input
          type="text"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-white mb-4 border-2 border-slate-300"
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-white mb-4 border-2 border-slate-300"
        />
        <input
          type='text'
          placeholder="birth(ex:YYYYMMDD)"
          maxLength={8}
          name="birth"
          value={formData.birth}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-white mb-4 border-2 border-slate-300"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-52 py-2 rounded-md text-black bg-stone-50 transition-colors duration-300 hover:bg-slate-700 focus:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          수정하기
        </button>
      </form>
      {isLoading && <LoadingIndicator />}
    </div>
  );
}