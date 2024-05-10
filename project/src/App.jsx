import { useEffect } from "react";
import { RouterProvider } from 'react-router-dom';


import router from './router';
import './index.css';

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬스토리지에서 token 가져오기
    if (token) {

    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
};

export default App;