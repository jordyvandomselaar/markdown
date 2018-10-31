import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = (props) => {
  const user = useContext(UserContext);

  return user
    ? <Route {...props}/>
    : <Redirect to="/login"/>;
};

export default ProtectedRoute;
