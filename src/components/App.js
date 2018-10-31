import React from 'react';
import Layout from './Layout';
import DocumentOverview from './pages/DocmentOverview';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Document from './pages/Document';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={DocumentOverview}/>
          <Route exact path="/login" component={Login}/>
          <Route
            path="/document"
            component={Document}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
