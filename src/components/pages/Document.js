import React, {useContext} from 'react';
import Editor from './Editor';
import {Route, Switch} from 'react-router-dom';
import NewDocument from './NewDocument';
import {firestore} from '../../firebase';
import DocumentOverview from './DocmentOverview';
import UserContext from '../../contexts/UserContext';

const Document = ({match}) => {
  const user = useContext(UserContext);

  const getDocumentCollection = () => {
    return firestore.collection('documents');
  };

  const getLabelsCollection = () => {
    return firestore.collection('labels');
  };

  const storeDocument = async (data, labels = []) => {
    labels.forEach(async name => {
      try {
        await getLabelsCollection().where('label', '==', name).where('user', '==', user.uid).get();
      } catch (e) {
        // If the label does not exist you get a permission error, create the label anew!
        const newLabel = getLabelsCollection().doc();
        await newLabel.set({label: name, user: user.uid, timestamp: Date.now()});
      }
    });

    const newDocument = getDocumentCollection().doc();
    await newDocument.set({...data, user: user.uid, timestamp: Date.now(), labels: labels});

    return newDocument;
  };

  const findDocument = async id => {
    const document = await getDocumentCollection().doc(id).get();

    if (document.exists) {
      return document;
    }

    return {};
  };

  const updateDocument = (id, data) => {
    const document = getDocumentCollection().doc(id);

    return document.update(data);
  };

  const deleteDocument = id => {
    getDocumentCollection().doc(id).delete();
  };

  const allDocuments = async () => {
    const documents = await getDocumentCollection().where('user', '==', user.uid).get();

    return documents.docs.reduce((carrier, document) => ({
      ...carrier,
      [document.id]: document.data(),
    }), {});
  };

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={props => <DocumentOverview {...props} fetchDocuments={allDocuments} deleteDocument={deleteDocument}/>}
      />
      <Route exact path={`${match.url}/new`} render={props => <NewDocument {...props} storeDocument={storeDocument}/>}/>
      <Route
        path={`${match.url}/:id`}
        render={props => <Editor {...props} findDocument={findDocument} updateDocument={updateDocument}/>}
      />
    </Switch>
  );
};

export default Document;
