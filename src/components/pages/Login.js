import React, {useEffect} from 'react';
import {initializeFirebaseAuthUi} from '../../firebase';

const Login = () => {
  useEffect(() => {
    initializeFirebaseAuthUi('#ui');
  });

  return (
    <div id="ui"/>
  );
};

export default Login;
