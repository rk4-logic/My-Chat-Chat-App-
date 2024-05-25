import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));   //Path same as Admin Login
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'));   
const MessageManagement = lazy(() => import('./pages/Admin/MessageManagement'));   
const ChatManagement = lazy(() => import('./pages/Admin/ChatManagement'));   
const NotFound = lazy(() => import('./pages/NotFound'));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />} >
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>

          <Route path='/login' element={
            <ProtectRoute user={!user} redirect='/' >
              <Login />
            </ProtectRoute>
          } />

          {/* ADMIN */}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/messages' element={<MessageManagement />} />
          <Route path='/admin/user-management' element={<UserManagement />} />
          <Route path='/admin/chat-management' element={<ChatManagement />} />

          {/* No Page  */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
