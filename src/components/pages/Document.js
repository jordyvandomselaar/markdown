import React, {useContext, useEffect, useState} from 'react';
import Editor from './Editor';
import {Route, Switch} from 'react-router-dom';
import NewDocument from './NewDocument';
import {firestore} from '../../firebase';
import DocumentOverview from './DocmentOverview';
import UserContext from '../../contexts/UserContext';

let saveTimeout;

const Document = ({ match, history }) => {
  const user = useContext(UserContext);
  const [documents, setDocuments] = useState({});
  const [shownDocuments, setShownDocuments] = useState({});

  const allDocuments = async () => {
    const documents = await getDocumentCollection()
      .where("user", "==", user.uid)
      .get();

    return transformDocuments(documents);
  };

  useEffect(() => {
    allDocuments().then(documents => {
      setDocuments(documents);
      setShownDocuments(documents);
    });
  }, []);

  const getDocumentCollection = () => {
    return firestore.collection("documents");
  };

  const getLabelsCollection = () => {
    return firestore.collection("labels");
  };

  const storeDocument = async (name, labels = []) => {
    labels.forEach(async name => {
      try {
        await getLabelsCollection()
          .where("label", "==", name)
          .where("user", "==", user.uid)
          .get();
      } catch (e) {
        // If the label does not exist you get a permission error, create the label anew!
        const newLabel = getLabelsCollection().doc();
        await newLabel.set({
          label: name,
          user: user.uid,
          timestamp: Date.now()
        });
      }
    });

    const newDocument = getDocumentCollection().doc();
    await newDocument.set({
      name,
      user: user.uid,
      timestamp: Date.now(),
      labels: labels
    });

    return history.push(`/documents/${newDocument.id}`);
  };

  const findDocument = async id => {
    const document = await getDocumentCollection()
      .doc(id)
      .get();

    if (document.exists) {
      return document;
    }

    return {};
  };

  const updateDocument = (id, data) => {
    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(() => {
      const document = getDocumentCollection().doc(id);

      return document.update(data);
    }, 200);
  };

  const deleteDocument = async id => {
    await getDocumentCollection()
      .doc(id)
      .delete();

    const clone = { ...documents };
    delete clone[id];

    setDocuments(clone);
  };

  const transformDocuments = documents =>
    documents.docs.reduce(
      (carrier, document) => ({
        ...carrier,
        [document.id]: document.data()
      }),
      {}
    );

  const search = async query => {
    if (!query) {
      setShownDocuments(documents);
    }

    const newDocuments = Object.keys(documents).reduce((result, id) => {
      const document = documents[id];
      const lowerCaseQuery = query.toLowerCase();

      if (document.markdown.toLowerCase().indexOf(lowerCaseQuery) > -1) {
        result[id] = document;
      }

      if (document.name.toLowerCase().indexOf(lowerCaseQuery) > -1) {
        result[id] = document;
      }

      const { labels } = document;

      const labelMatches = labels.filter(
        label => label.toLowerCase().indexOf(lowerCaseQuery) > -1
      );

      if (labelMatches.length) {
        result[id] = document;
      }

      return result;
    }, {});

    setShownDocuments(newDocuments);
  };

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={props => (
          <DocumentOverview
            {...props}
            documents={shownDocuments}
            deleteDocument={deleteDocument}
            search={search}
          />
        )}
      />
      <Route
        exact
        path={`${match.url}/new`}
        render={props => (
          <NewDocument {...props} storeDocument={storeDocument} />
        )}
      />
      <Route
        path={`${match.url}/:id`}
        render={props => (
          <Editor
            {...props}
            findDocument={findDocument}
            updateDocument={updateDocument}
          />
        )}
      />
    </Switch>
  );
};

export default Document;
