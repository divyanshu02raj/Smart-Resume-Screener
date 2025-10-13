import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const PrivateRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

