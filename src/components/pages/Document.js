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
      setLoading(false);
    });
  }, []);

  const getDocumentCollection = () => {
    return firestore.collection("documents");
  };

  const getLabelsCollection = () => {
    return firestore.collection("labels");
  };

  const updateFirestoreDocument = documentToSave => {
    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(() => {
      const document = getDocumentCollection().doc(documentToSave.id);

      const data = { ...documentToSave };
      delete data.id;

      return document.update(data);
    }, 200);
  };

  const updateDocument = document => {
    setDocuments({ ...documents, [document.id]: document });
    setShownDocuments({ ...documents, [document.id]: document });

    updateFirestoreDocument(document);
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

    const newDocumentForState = {
      id: newDocument.id,
      name,
      markdown: "",
      labels
    };

    setDocuments({
      ...documents,
      [newDocumentForState.id]: newDocumentForState
    });

    return history.push(`/documents/${newDocument.id}`);
  };

  const deleteDocument = async id => {
    await getDocumentCollection()
      .doc(id)
      .delete();

    const clone = { ...documents };
    delete clone[id];

    setDocuments(clone);
    setShownDocuments(clone);
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
