import React, { useState, useMemo } from 'react';
import Lecbox from './lecbox';
import LecInput from './lecinput';
import useLectureData from '../../api/lectureList';

import { DeleteData } from '../../api/lectureEnrollment';


function Lecture() {
  const { data, isLoading, error  } = useLectureData();
  const mutation = DeleteData();
  const [searchText, setSearchText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const filteredBoxes = useMemo(() => {
    return data ? data.filter(box => box.lecture.title.toLowerCase().includes(searchText.toLowerCase())) : [];
  }, [data, searchText]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const onDeleteHandler = async(title,lecid,memid) =>{
      try {
        await mutation.mutateAsync({lecid,memid});
      } catch (error) {
        console.error('취소 중 오류 발생:', error);
      }
    
  }
  return (
    <div className="w-11/20 h-full flex flex-col">
      <div className="w-full min-h-15 flex items-center justify-center text-2xl border-b border-gray-400">
        현재 수강 중인 강의
      </div>
      
      <LecInput onSearch={handleSearch} />
      {!isLoading && !error ? (
        <div className="h-[calc(100vh-225px)] flex flex-col items-center overflow-y-scroll scrollbar-hide border-r border-black px-4">
          {filteredBoxes.length > 0 ? (
            filteredBoxes.map((box) => (
              <Lecbox 
                key={box.id} 
                name={box.lecture.owner.name} 
                boxId={box.lecture.id} 
                text={box.lecture.title} 
                onDelete={() => onDeleteHandler(box.lecture.title,box.lecture.id,box.member.id)} 
              />
            ))
          ) : (
            <div>수강 중인 강의가 없네요..</div>
          )}
        </div>
        
      ):(<div>Didacto 학생 전용입니다..!</div>)}
      
    </div>
  )
}

export default Lecture;