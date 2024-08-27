import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinBox from '../components/login/signup';
import Form from '../components/login/login';
import { Button } from '@radix-ui/themes';
import { signIn } from '../api/login'; // Import the signIn function
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogAction, 
  AlertDialogCancel 
} from '../components/ui/alert-dialog'; // Adjust the import path accordingly

export default function Splash() {
  const navigate = useNavigate();
  const [loginShow, setLoginShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const Info = JSON.parse(atob(token.split('.')[1]));
          const milliseconds = Info.exp * 1000;
          const role = Info.auth;
          const date = new Date(milliseconds);
          const currentTime = new Date();

          if (role === 'ROLE_USER' && date > currentTime) {
            navigate('/');
          }
          else{
            localStorage.removeItem('token');
            localStorage.removeItem('rtk');
            navigate('/auth');
            window.location.reload();
          }
        } catch {
          navigate('/auth');
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 1000);

    return () => clearInterval(interval);
  }, []);


  const changeShow = () => {
    setLoginShow(!loginShow);
  };

  const handleSignIn = async (formData) => {
    setIsLoading(true); // Ensure loading state is set
    const result = await signIn(formData, setIsLoading);
    setAlertMessage(result.message);
    setAlertOpen(true); // Ensure alert is opened
    if (result.success) {
      navigate('/');
    }
  };
  

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col justify-center items-center">
      <div className="w-1/2 h-full text-white text-2xl font-bold text-center flex flex-col items-center justify-center ">
        {
          loginShow ? <Form onSubmit={handleSignIn} /> : <JoinBox />
        }
        <Button
          onClick={changeShow}
          className="w-56 bg-transparent h-8 fixed bottom-10"
        >
          {!loginShow ? '로그인 하러가기' : '회원가입 하러가기'}
        </Button>
        <h4 className='text-gray-600'>학생 전용입니다.</h4>
      </div>
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