import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import CreateLogin from './components/CreateLogin/CreateLogin'
import Login from './components/Login/Login'
import { auth } from './firebase/auth'
import SignUp from './components/Login/SignUp'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App