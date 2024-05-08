import { createBrowserRouter } from 'react-router-dom';
import Room from './pages/room';
import Notfound from './pages/notfound';
import Home from './pages/home';
import Layout from './layout/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <Notfound />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'room',
        element: <Room />
      },
    ],
  },
]);

export default router;