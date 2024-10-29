import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children, requiredRole }) => {
    const { currentUser, role } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
