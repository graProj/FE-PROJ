import React from 'react'
import useRequestLecture from "../../api/requestLecture"
import LoadingIndicator from '../../hooks/loading';
import { CancelData } from '../../api/lectureEnrollment';
import { EraserIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';

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
    <div className="w-full min-h-[calc(100vh-115px)] ">
      {/* data 사용 예시 */}
      {isLoading && <LoadingIndicator/>}
      {!isLoading && !error && 
      (data && data.response && data.response.enrollments && data.response.enrollments.map((enrollment, index) => (
        <div key={index} className="w-full min-h-[20%] border-b border-gray-400 flex flex-col justify-center items-center">
          <p>{enrollment.status}</p>
          <p>{enrollment.lecture.title}-{enrollment.lecture.owner.name}</p>
          <Button onClick={()=>onSubmitHandler(enrollment.lecture.title, enrollment.id)}><EraserIcon/></Button>
        </div>
      )))}
    </div>
  );
}