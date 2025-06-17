import { Navigate } from 'react-router-dom';
import authService from '../api/users';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = authService.isLoggedIn();
    return isLoggedIn ? children : <Navigate to="/users/account/login" />;
};

export default ProtectedRoute;
