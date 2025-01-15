import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider, useSearchParams } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { API_ENDPOINT } from '../utils/constants'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/account/edit',
        element: <EditProfile />
      },
      {
        path: '/chat',
        element: <ChatPage />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

function App() {

  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);

  const dispatch = useDispatch();

  useEffect(() => {

    

    if (user) {
      const socketio = io(`${API_ENDPOINT}`, {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      })

      dispatch(setSocket(socketio));

      // listening all events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        // console.log("online Users" , onlineUsers);
        dispatch(setOnlineUsers(onlineUsers))
      })

      return () => {
        socketio.close();
        dispatch(setSocket(null))
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null))
    }
  }, [user, dispatch]);

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App
