import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('accessToken') as string;
    console.log("token", token);


  return (token!=null || token!=undefined) ? <Outlet/> : <Navigate to="/auth/login" />
}

export default PrivateRoutes;