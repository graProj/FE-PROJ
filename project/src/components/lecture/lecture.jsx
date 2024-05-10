import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Lecbox from './lecbox';
import LectureModal from './modal';
import LecInput from './lecinput';
import useLectureData from '../../api/lectureList';
import LoadingIndicator from '../../hooks/loading';

function Lecture() {
  const { data, isLoading, error } = useLectureData();

  const [lectureBoxes, setLectureBoxes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (data && data.response && data.response.lectures) {
      setLectureBoxes(data.response.lectures);
    }
  }, [data]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const handleDeleteBox = (id) => {
    const updatedLectureBoxes = lectureBoxes.filter(box => box.id !== id);
    setLectureBoxes(updatedLectureBoxes);
  };
  console.log(data)
  return (
    <Container>
      <Title>현재 강의 중인 목록</Title>
      <Btn onClick={() => setIsModalOpen(true)}><Add/> 강의 신청</Btn>
      <LecInput onSearch={handleSearch} />
      {isLoading && <LoadingIndicator/>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <LectureList>
          {lectureBoxes.filter(box => box.title.toLowerCase().includes(searchText.toLowerCase())).map((box) => (
            <Lecbox key={box.id} name={box.owner.name} boxId={box.id} text={box.title} onDelete={() => handleDeleteBox(box.id)} />
          ))}
        </LectureList>
      )}
      {isModalOpen && <LectureModal onClose={() => setIsModalOpen(false)} />}
    </Container>
  )
}

export default Lecture;

const Container = styled.div`
  width:55%;
  height:100%;
  display:flex;
  flex-direction:column;
`;
const Btn = styled(Button)`
  width: 200px;
  height: 40px;
  background-color: darkblue;
  text-align: center;
`
const Title = styled.div`
  width: 100%;
  min-height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  border-bottom:1px solid #c4ae9bbb;
`;

const LectureList = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  overflow-y:scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    width: 0;
  }
  border-right:1px solid black;
  padding-left:15px;
  padding-right:15px;
`;
