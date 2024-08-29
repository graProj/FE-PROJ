import { createHashRouter } from 'react-router-dom';

import PrivateRoutes from './layout/layout';
import Room from './pages/room';
import Notfound from './pages/notfound';
import Home from './pages/home';
import Splash from './pages/splash';
import LectureRoom from './pages/lectureRoom';
import ModifyUser from './pages/modifyUser';
import MediaTest from './pages/mediaTest';
import Search from './pages/search';
import LectureInfo from './pages/lectureInfo';
import RemoteInfo from './pages/remoteInfo';

const router = createHashRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home/lectureinfo',
        element: <LectureInfo />
      },
      {
        path: 'home/room/:remoteId',
        element: <Room />
      },
      {
        path: 'home/:id', 
        element: <LectureRoom />
      },
      {
        path: 'home/info', 
        element: <ModifyUser />
      },
      {
        path: 'home/testroom', 
        element: <MediaTest />
      },
      {
        path: 'home/search', 
        element: <Search/>
      },
    ],
  },
  {
    path: 'auth',
    element: <Splash />
  },
  {
    path: '*',
    element: <Notfound />
  }
]);

export default router;