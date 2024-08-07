import React, { useState } from "react";
import signUp from "../../api/signup";

const JoinBox = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    birth: "",
    authority: "USER"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signUp(formData);
      console.log("회원가입 성공:", data);
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
  };

  return (
    <div className="w-full h-full p-1">
      <div>
        <h2 className="text-2xl font-bold text-white">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-transparent border border-white rounded-lg w-4/5 h-8 font-light text-xl text-white"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-transparent border border-white rounded-lg w-4/5 h-8 font-light text-xl text-white"
            />
          </div>

          <div className="mb-8 text-xl">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium">이름</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-transparent border border-white rounded-lg w-4/5 h-8 font-light text-xl text-white"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="birth" className="block text-gray-700 text-sm font-medium">생년월일</label>
            <input
              id="birth"
              name="birth"
              type="text"
              placeholder="생년월일을 입력해주세요 (예: 19970805)"
              value={formData.birth}
              onChange={handleInputChange}
              className="bg-transparent border  border-white rounded-lg w-4/5 h-8 text-white font-light text-xl"
            />
          </div>

          <button type="submit" className="w-48 p-2 border-none rounded-md outline-none cursor-pointer text-white bg-blue-500 transition duration-300 hover:bg-blue-700 focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinBox;