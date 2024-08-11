import { useEffect } from "react";
import { RouterProvider } from 'react-router-dom';


import router from './router';
import './index.css';

const App = () => {
    useEffect(() => {
        console.log(window.location.href);
    }, []);

    return (
        <RouterProvider router={router} />
    );
};

export default App;