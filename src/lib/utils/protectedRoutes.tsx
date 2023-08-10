import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = localStorage.getItem('accessToken');

  return token ? <Outlet/> : <Navigate to="/auth/login" />
}

export default PrivateRoutes;