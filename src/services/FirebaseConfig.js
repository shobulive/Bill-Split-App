import * as firebase from "firebase";
const FirebaseConfigJS = () => {
  const firebaseConfig = {
    // config.js
    apiKey: "AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM",
    authDomain: "walnut-cloneapp.firebaseapp.com",
    databaseURL: "https://walnut-cloneapp.firebaseio.com",
    projectId: "walnut-cloneapp",
    storageBucket: "walnut-cloneapp.appspot.com",
    messagingSenderId: "1037549073432"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
};
export default FirebaseConfigJS;
