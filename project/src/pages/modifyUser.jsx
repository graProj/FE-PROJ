import React, { useState } from 'react';
import styled from 'styled-components';
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
    <Container>
      
      <FR onSubmit={handleSubmit}>
        회원정보 수정
        <Input
          type="text"
          placeholder="password"
          name="password"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          type='text'
          placeholder="birth(ex:YYYYMMDD)"
          maxLength={8}
          name="birth"
          value={formData.birth}
          onChange={handleInputChange}
        />
        <Btn type="submit" disabled={isLoading}>수정하기</Btn>
      </FR>
      {isLoading && <LoadingIndicator />}
    </Container>
  );
}

const Btn = styled.button`
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
`;

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  text-align: center;
  font-size: 28px;
`;

const FR = styled.form`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid white;
  width: 50%;
  height: 30px;
  color: white;
`;
