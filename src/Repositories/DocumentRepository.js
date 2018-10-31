import {firestore} from '../firebase';

const getDocumentCollection = () => {
  return firestore.collection('documents');
};

export const store = (data) => {
  const newDocument = getDocumentCollection().doc();

  newDocument.set(data);

  return newDocument;
};

export const find = async id => {
  const document = await getDocumentCollection().doc(id).get();

  if (document.exists) {
    return document.data();
  }

  return {};
};

export const update = (id, data) => {
  const document = getDocumentCollection().doc(id);

  document.update(data);
};

export const all = async () => {
  const documents = await getDocumentCollection().get();

  return documents.docs.reduce((carrier, document) => ({
    ...carrier,
    [document.id]: document.data(),
  }), {});
};
