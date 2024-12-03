import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Roles } from './roles';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getToken } from '@/utils/auth';

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole: Roles }) => {
  const { user } = useContext(AuthContext);
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  // if (user) {
  //   return <Navigate to="/dashboard" />;
  // }

  // if (user.role !== requiredRole) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return children;
};

export default ProtectedRoute;

