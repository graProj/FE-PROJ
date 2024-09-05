import React, { useState } from 'react'
import useRequestLecture from "../../api/requestLecture"
import LoadingIndicator from '../../hooks/loading';
import { CancelData } from '../../api/lectureEnrollment';
import { EraserIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';

import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogAction,  
} from '../ui/alert-dialog';


export default function RequestBox() {
  const { data, isLoading, error } = useRequestLecture();
  const mutation = CancelData();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const onSubmitHandler = async (id) => {

      try {
        const result = await mutation.mutateAsync(id);
        setAlertMessage(result.message); // Use the returned message
        setAlertOpen(true);
      } catch (err) {
        console.log(err.response.status)
      }

  };

  return (
    <div className="w-full h-screen overflow-y-scroll min-h-[calc(100vh-115px)] ">
      {/* data 사용 예시 */}
      {isLoading && <LoadingIndicator/>}
      {!isLoading && !error && 
      (data && data.response && data.response.enrollments && data.response.enrollments.map((enrollment, index) => (
        <div key={index} className="w-full max-h-[25%] border-b border-gray-400 flex flex-col justify-center items-center">
          <p>{enrollment.status}</p>
          <p>{enrollment.lecture.title}</p> <p> {enrollment.lecture.owner.name}</p>
          <Button className='flex' onClick={()=>onSubmitHandler(enrollment.id)}>취소<EraserIcon/></Button>
        </div>
      )))}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {alertMessage}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>알겠습니다.</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}