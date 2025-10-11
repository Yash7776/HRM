import { Outlet,Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContex.jsx';
import { useContext } from 'react';

const PrivateRoute = () => {
    let {user}=useContext(AuthContext)
    // const authenticated = true; // determine if authorized, from context or however you're doing it

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;