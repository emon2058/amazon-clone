import firebase from 'firebase'; {/*npm i firebase*/}

const firebaseConfig = {
  apiKey: "AIzaSyCX3hqJcL6-BTj_6fZ0aOm9TrHJOiLFpfo",
  authDomain: "clone-16b38.firebaseapp.com",
  databaseURL: "https://clone-16b38.firebaseio.com",
  projectId: "clone-16b38",
  storageBucket: "clone-16b38.appspot.com",
  messagingSenderId: "89543988839",
  appId: "1:89543988839:web:091f366238fd17a2ef26c2",
  measurementId: "G-KV7GSFRMLD"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db,auth }
