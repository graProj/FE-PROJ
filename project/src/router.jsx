import { createBrowserRouter } from 'react-router-dom';

import Room from './pages/room';
import Notfound from './pages/notfound';
import Home from './pages/home';
import Splash from './pages/splash';
import PrivateRoutes from './layout/layout';
import LectureRoom from './pages/lectureRoom';
import ModifyUser from './pages/modifyUser';
const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'room',
        element: <Room />
      },
      {
        path: '/home/:id', 
        element: <LectureRoom />
      },
      {
        path: '/home/info', 
        element: <ModifyUser />
      },
    ],
  },
  {
    path: 'auth',
    element: <Splash />
  },
  {
    path: "*",
    element: <Notfound />
  },
]);

export default router;