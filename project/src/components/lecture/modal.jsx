import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
async function postData(data) {
    return await axios.post('http://3.39.22.211/api/v1/enrollment', {'lectureId':data});
  }
function LectureModal({ onClose }) {
  const [roomId, setroomId] = useState(0);

  
  const handleClose = () => {
    onClose(); 
  };

  const onChangeHandler = (e) => {
    setroomId(e.target.value);
  };
  const onSubmitHandler = async () => {
    postData(roomId);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Contents>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <MainContext>
            <input type="text" value={roomId} onChange={onChangeHandler} />
            <button onClick={onSubmitHandler}>신청하기</button>
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


