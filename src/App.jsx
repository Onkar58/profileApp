import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import CreateLogin from './components/CreateLogin/CreateLogin'
import Login from './components/Login/Login'
import SignUp from './components/Login/SignUp'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import PrivateRoutes from './PrivateRoutes'


const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Homepage />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App