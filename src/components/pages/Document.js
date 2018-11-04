import React from 'react';
import MarkdownEditor from './MarkdownEditor';
import {Route, Switch} from 'react-router-dom';
import NewDocument from './NewDocument';
import {firestore} from '../../firebase';
import DocumentOverview from './DocmentOverview';

const getDocumentCollection = () => {
  return firestore.collection('documents');
};

const storeDocument = (data, userId) => {
  const newDocument = getDocumentCollection().doc();

  newDocument.set(data);

  return newDocument;
};

const findDocument = async id => {
  const document = await getDocumentCollection().doc(id).get();

  if (document.exists) {
    return document.data();
  }

  return {};
};

const updateDocument = (id, data) => {
  const document = getDocumentCollection().doc(id);

  document.update(data);
};

const allDocuments = async () => {
  const documents = await getDocumentCollection().get();

  return documents.docs.reduce((carrier, document) => ({
    ...carrier,
    [document.id]: document.data(),
  }), {});
};

const Document = ({match}) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={props => <DocumentOverview {...props} fetchDocuments={allDocuments}/>}
      />
      <Route exact path={`${match.url}/new`} render={props => <NewDocument {...props} storeDocument={storeDocument}/>}/>
      <Route
        path={`${match.url}/:id`}
        render={props => <MarkdownEditor {...props} findDocument={findDocument} updateDocument={updateDocument}/>}
      />
    </Switch>
  );
};

export default Document;
