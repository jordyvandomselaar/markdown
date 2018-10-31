import React from 'react';
import MarkdownEditor from './MarkdownEditor';
import {Route, Switch} from 'react-router-dom';
import NewDocument from './NewDocument';

const Document = ({match}) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/new`} component={NewDocument}/>
      <Route path={`${match.url}/:id`} component={MarkdownEditor}/>
    </Switch>
  );
};

export default Document;
