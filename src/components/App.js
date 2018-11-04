import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Document from './pages/Document';
import Login from './pages/Login';
import UserContext from '../contexts/UserContext';
import {firebase} from '../firebase';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Layout>
          <Switch>
            {
              !loading &&
              <>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/" render={() => <Redirect to="/document"/>}/>
                <ProtectedRoute
                  path="/document"
                  component={Document}
                />
              </>
            }
          </Switch>
        </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
