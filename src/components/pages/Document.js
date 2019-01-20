import React, { useContext, useEffect, useState } from "react";
import Editor from "./Editor";
import { Route, Switch } from "react-router-dom";
import NewDocument from "./NewDocument";
import { firestore } from "../../firebase";
import DocumentOverview from "./DocumentOverview";
import UserContext from "../../contexts/UserContext";

let saveTimeout;

const Document = ({ match, history }) => {
  const user = useContext(UserContext);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [shownDocuments, setShownDocuments] = useState({});

  const subscribeToDocuments = async () => {
    await getDocumentCollection()
      .where("user", "==", user.uid)
      .onSnapshot(snapshot => {
        const transformedDocuments = transformDocuments(snapshot);

        setDocuments(transformedDocuments);
        setShownDocuments(transformedDocuments);
        setLoading(false);
      });

    return {};
  };

  useEffect(() => {
    subscribeToDocuments();
  }, []);

  const getDocumentCollection = () => {
    return firestore.collection("documents");
  };

  const getLabelsCollection = () => {
    return firestore.collection("labels");
  };

  const updateDocument = documentToSave => {
    clearTimeout(saveTimeout);

    documents[documentToSave.id] = {
      ...documents[documentToSave.id],
      ...documentToSave
    };

    setDocuments(documents);
    setShownDocuments(documents);

    saveTimeout = setTimeout(() => {
      const document = getDocumentCollection().doc(documentToSave.id);

      delete documentToSave.id;

      return document.update(documentToSave);
    }, 200);
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
      labels: labels,
      shared: false
    });

    return history.push(`/documents/${newDocument.id}`);
  };

  const deleteDocument = async id => {
    await getDocumentCollection()
      .doc(id)
      .delete();
  };

  const shareDocument = async id => {
    const documentRef = getDocumentCollection().doc(id);
    const document = await documentRef.get();

    await documentRef.update({ shared: !document.data().shared });

    documents[id].shared = true;

    setDocuments(documents);
  };

  const transformDocuments = documents =>
    documents.docs.reduce(
      (carrier, document) => ({
        ...carrier,
        [document.id]: {
          ...document.data(),
          id: document.id
        }
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

  if (loading) {
    return null;
  }

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
            shareDocument={shareDocument}
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
        render={({ match, ...props }) => (
          <Editor
            {...props}
            match={match}
            document={documents[match.params.id]}
            updateDocument={updateDocument}
          />
        )}
      />
    </Switch>
  );
};

export default Document;
