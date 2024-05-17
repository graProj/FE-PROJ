import React, { useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

import {postData} from '../../api/lectureEnrollment'
import useSearchData from '../../api/searchlecture';
import M_Lecbox from './searchedbox';
import LecInput from './lecinput';

function LectureModal({ onClose }) {
  const [roomTitle, setroomTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSearchData(searchText);

  const handleClose = () => {
    queryClient.invalidateQueries('requestLecture');
    onClose();
  };

  const handleSearch = (roomTitle) => {
    setroomTitle(roomTitle);
  };
  const onSearchHandler = async () => {
    
    setSearchText(roomTitle);
  };
  const onSubmitHandler = (title,id) =>{
    const isEnrolled= window.confirm(`${title} 신청하시겠습니까?`);
    if(isEnrolled){
      postData(id);
    }
    
  }
  return (
    <ModalOverlay>
      <ModalContent>
        <Contents>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <MainContext>
            <LecInput onSearch={handleSearch} />
            <button onClick={onSearchHandler}>강의 검색하기</button>
            <div>
              {!isLoading && !error && (
                <LectureList>
                  {data.map((box,index) => (
                    <M_Lecbox
                      key={index}
                      name={box.owner.name}
                      boxId={box.id}
                      text={box.title}
                      onEnroll={() => onSubmitHandler(box.title,box.id)}
                    />
                  ))}
                </LectureList>
              )}
            </div>
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
  color: black;
`;
const LectureList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    width: 0;
  }
  border-right: 1px solid black;
  padding-left: 15px;
  padding-right: 15px;
`;


