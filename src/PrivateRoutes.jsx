import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from './utils/functions';

const PrivateRoutes = () => {
    const accessToken = getCookie("token");
    return (
    accessToken ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes