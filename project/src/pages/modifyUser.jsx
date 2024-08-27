import React, { useState } from 'react';
import LoadingIndicator from '../hooks/loading';
import { Modify } from '../api/user';
import { useNavigate } from 'react-router-dom';
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

export default function ModifyUser() {
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    birth:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await Modify(formData);
    setIsLoading(false);
    setAlertMessage(result.message);
    setAlertOpen(true);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="w-screen h-[70vh] text-center text-2xl">
      <form onSubmit={handleSubmit} className="pt-5 flex flex-col justify-between items-center w-full h-full">
        <h2 className="mb-4">회원정보 수정</h2>
        <input
          type="text"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-black mb-4 border-2 border-slate-300"
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-black mb-4 border-2 border-slate-300"
        />
        <input
          type='text'
          placeholder="birth(ex:YYYYMMDD)"
          maxLength={8}
          name="birth"
          value={formData.birth}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg w-1/2 h-8 text-black mb-4 border-2 border-slate-300"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-52 py-2 rounded-md text-black bg-stone-50 transition-colors duration-300 hover:bg-slate-700 focus:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          수정하기
        </button>
      </form>
      {isLoading && <LoadingIndicator />}
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