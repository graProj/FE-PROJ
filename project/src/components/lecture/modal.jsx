import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
function postData(data) {
    return axios.post('http://3.39.22.211/api/v1/enrollment', data);
  }
function LectureModal({ onClose }) {
  const [roomId, setroomId] = useState(0);
  const { mutate, isLoading, isError } = useMutation(postData);
  
  const handleClose = () => {
    onClose(); 
  };

  const onChangeHandler = (e) => {
    const changeId = e.target.value;
    setroomId(changeId);
  };

  const onSubmitHandler = async () => {
    try {
      const response = await mutate({ roomId });
      console.log('POST 요청 성공:', response.data);
      onClose();
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Contents>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <MainContext>
            일단 스탑
            <input type="text" value={roomId} onChange={onChangeHandler} />
            <button onClick={onSubmitHandler}>만들기</button>
          </MainContext>
        </Contents>
      </ModalContent>
    </ModalOverlay>
  );
}

export default LectureModal;

// 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: relative;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #555;
`;

const Contents = styled.div`
  width: 60vw;
  height: 60vh;
`;

const MainContext = styled.div`
  width: 100%;
  height: 80%;
`;


