import styled from '@emotion/styled'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

import useRequestLecture from "../../api/requestLecture"
import LoadingIndicator from '../../hooks/loading';
import { CancelData } from '../../api/lectureEnrollment';

export default function RequestBox() {
  const { data, isLoading, error } = useRequestLecture();
  const mutation = CancelData();

  const onSubmitHandler = async (title , id) => {
    const isCanceled = window.confirm(`${title} 취소하시겠습니까?`);
    if (isCanceled) {
      try {
        await mutation.mutateAsync(id);
        alert('신청이 취소되었습니다.');// 데이터 다시 가져오기
      } catch (error) {
        console.error('취소 중 오류 발생:', error);
      }
    }
  };



  return (
    <Container>
      {/* data 사용 예시 */}
      {isLoading && <LoadingIndicator/>}
      {!isLoading && !error && 
      (data && data.response && data.response.enrollments && data.response.enrollments.map((enrollment, index) => (
        <LectureItem key={index}>
          <p>{enrollment.status}</p>
          <p>{enrollment.lecture.title}-{enrollment.lecture.owner.name}</p>
          <button onClick={()=>onSubmitHandler(enrollment.lecture.title, enrollment.id)}><CancelIcon/></button>
        </LectureItem>
      )))}
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 115px);
    overflow: scroll;
    ::-webkit-scrollbar{
      display: none;
    }
`;

const LectureItem = styled.div`
    width: 100%;
    min-height: 20%;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
