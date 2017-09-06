/*jslint es6 */
import axios from "axios";
import * as firebase from "firebase";
const store = require("../store");
let itemRef = firebase
  .database()
  .ref()
  .child("Main")
  .child("Transactions")
  .toString();
itemRef += ".json?key=AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM";
export default (FetchGroups = dispatch => {
  dispatch({ type: "FETCH_TRANSACTION_START" });
  axios
    .get(itemRef)
    .then(response => {
      dispatch({ type: "FETCH_TRANSACTION_SUCCESS", payload: response.data });
    })
    .catch(err => {
      dispatch({ type: "FETCH_TRANSACTION_ERROR", payload: err });
    });
});
