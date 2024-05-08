import React, { useState } from "react";
import styled from "styled-components";
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
    setFormData(prevFormData => {
      
      const updatedFormData = {
        ...prevFormData,
        [name]: value
      };
      return updatedFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 회원가입 요청 보내기
      const data = await signUp(formData); // signUpMutation을 호출하여 mutateAsync 함수 사용
      console.log("회원가입 성공:", data);
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
  };
  
  
  return (
    <StyledJoinBox>
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="email">이메일</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleInputChange}
            />

          </div>

          <div className="mb-8">
            <label htmlFor="password">비밀번호</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleInputChange}
            />

          </div>

          <div className="mb-8">
            <label htmlFor="name">이름</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleInputChange}
            />

          </div>

          <div className="mb-8">
            <label htmlFor="birth">생년월일</label>
            <Input
              id="birth"
              name="birth"
              type="text"
              placeholder="생년월일을 입력해주세요 (예: 19970805)"
              value={formData.birth}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">회원가입</button>
        </form>
      </div>
    </StyledJoinBox>
  );
};

export default JoinBox;

const Input = styled.input`
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid white;
  width: 80%;
  height: 30px;
  color: white;
`
const StyledJoinBox = styled.div`
  width: 50%;
  padding: 16px;


  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  form {

    label {
      color: #4b5563;
      font-size: 0.875rem;
      font-weight: medium;
      display: block;
    }

    button {
      width: 200px;
      padding: 8px;
      border: none;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      color: #fff;
      background-color: #3b82f6;
      transition: background-color 0.3s, color 0.3s;

      &:hover,
      &:focus {
        background-color: #2563eb;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #3b82f6;
      }
    }
  }
`;

