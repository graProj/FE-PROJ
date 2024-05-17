import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import Lecbox from './lecbox';
import LectureModal from './modal';
import LecInput from './lecinput';
import useLectureData from '../../api/lectureList';
import LoadingIndicator from '../../hooks/loading';
import { DeleteData } from '../../api/lectureEnrollment';

function Lecture() {
  const { data, isLoading, error ,refetch } = useLectureData();
  const mutation = DeleteData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredBoxes = useMemo(() => {
    return data ? data.filter(box => box.lecture.title.toLowerCase().includes(searchText.toLowerCase())) : [];
  }, [data, searchText]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const onDeleteHandler = async(title,lecid,memid) =>{
    const isDelete= window.confirm(`${title} 삭제하시겠습니까?`);
    if(isDelete){
      try {
        await mutation.mutateAsync({lecid,memid});
      } catch (error) {
        console.error('취소 중 오류 발생:', error);
      }
    }
    
  }


  return (
    <Container>
      <Title>현재 강의 중인 목록</Title>
      <Btn onClick={() => setIsModalOpen(true)}><Add/> 강의 신청</Btn>
      <LecInput onSearch={handleSearch} />
      {isLoading && <LoadingIndicator/>}
      {!isLoading && !error && (
        <LectureList>
          {filteredBoxes.map((box) => (
            <Lecbox 
              key={box.id} 
              name={box.lecture.owner.name} // 수정 필요할 수 있음, owner의 name 속성이 있는지 확인 필요
              boxId={box.lecture.id} 
              text={box.lecture.title} // lecture 객체의 title 속성 사용
              onDelete={() => onDeleteHandler(box.lecture.title,box.lecture.id,box.member.id)} 
            />
            
          ))}
          
        </LectureList>
      )}
      {isModalOpen && <LectureModal onClose={() => setIsModalOpen(false)} />}
    </Container>
  )
}

export default Lecture;

const Container = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Btn = styled(Button)`
  width: 200px;
  height: 40px;
  background-color: darkblue;
  text-align: center;
`;

const Title = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border-bottom: 1px solid #c4ae9bbb;
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
