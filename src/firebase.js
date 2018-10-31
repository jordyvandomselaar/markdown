import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};


firebase.initializeApp(config);

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true,
});

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const initializeFirebaseAuthUi = (selector) => {
  ui.start(selector, uiConfig);
};

export {
  firebase,
  firestore,
  firebaseui,
  ui,
  initializeFirebaseAuthUi,
};
