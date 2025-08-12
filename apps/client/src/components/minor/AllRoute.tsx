import React from 'react';
import { useCookie } from '../../hooks/cookies'
import { Navigate } from 'react-router-dom';

const AllRoute: React.FC = () => {
  const {cookie} = useCookie();
  return cookie.token ? <Navigate to="/" /> : <Navigate to="/auth/login" />
}

export default AllRoute
