import axios from "axios";
import * as firebase from "firebase";
const store = require("../store");
let users = [];
const firebaseConfig = {
  apiKey: "AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM",
  authDomain: "walnut-cloneapp.firebaseapp.com",
  databaseURL: "https://walnut-cloneapp.firebaseio.com",
  projectId: "walnut-cloneapp",
  storageBucket: "walnut-cloneapp.appspot.com",
  messagingSenderId: "1037549073432"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
let itemRef = firebase
  .database()
  .ref()
  .child("Main")
  .child("Users")
  .toString();
itemRef += ".json?key=AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM";

export default (FetchUsers = dispatch => {
  dispatch({ type: "FETCH_USERS_START" });
  axios
    .get(itemRef)
    .then(response => {
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    })
    .catch(err => {
      dispatch({ type: "FETCH_USERS_ERROR", payload: err });
    });
});
