import React, {useContext, useEffect} from 'react';
import {initializeFirebaseAuthUi} from '../../firebase';
import UserContext from '../../contexts/UserContext';
import {Redirect} from 'react-router-dom';

const Login = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Redirect to="/"/>;
  }

  useEffect(() => {
    initializeFirebaseAuthUi('#ui');
  });

  return (
    <div id="ui"/>
  );
};

export default Login;
