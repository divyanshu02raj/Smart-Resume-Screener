import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader'; // We'll use your existing Loader component

const PrivateRoute = () => {
    const { user, isLoading } = useAuth();

    // 1. If we are still checking for a user, show a loading screen
    if (isLoading) {
        return <Loader />;
    }

    // 2. If the check is done and there is a user, show the dashboard
    //    The <Outlet /> component renders the child route (in our case, the Dashboard)
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

