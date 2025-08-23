import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';

import Home from './pages/Home';
import Servers from './pages/Servers';
import ServerDetails from './pages/ServerDetails';
import Gate from './pages/Gate';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddServer from './pages/AddServer';
import EditServer from './pages/EditServer';
import About from './pages/About';
import NotFound from './pages/NotFound.jsx';

// Глобальные стили
import './styles/global.css';


import './index.css';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servers', element: <Servers /> },
      { path: 'servers/:id', element: <ServerDetails /> },
      { path: 'publish', element: <Gate /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: 'servers/add', element: <AddServer /> },
      { path: 'servers/:id/edit', element: <EditServer /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
