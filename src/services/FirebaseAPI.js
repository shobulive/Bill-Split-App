import * as firebase from "firebase";
const API = class API {
  FetchUsersAPI() {
    let itemRef = firebase
      .database()
      .ref()
      .child("Main")
      .child("Users")
      .toString();
    itemRef += ".json?key=AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM";
    return itemRef;
  }
  FetchTransactionsAPI() {
    let itemRef = firebase
      .database()
      .ref()
      .child("Main")
      .child("Transactions")
      .toString();
    itemRef += ".json?key=AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM";
    return itemRef;
  }
  FetchGroupsAPI() {
    let itemRef = firebase
      .database()
      .ref()
      .child("Main")
      .child("Groups")
      .toString();
    itemRef += ".json?key=AIzaSyDLG843o2tXAeGgrvvujC9Dgj2gS8iwUXM";
    return itemRef;
  }
  RemoveGroupByID(key) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Groups")
      .child(key)
      .remove();
  }
  RemoveTransactionById(key) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Transactions")
      .child(key)
      .remove();
  }
  UpdateUserByObjectAndKey(key, User) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Users")
      .child(key)
      .update(User);
  }
  UpdateGroupsByObjectAndKey(key, Update) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Groups")
      .child(key)
      .update(Update);
  }
  AddGroup(newGroup) {
    debugger;
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Groups")
      .push(newGroup);
  }
  AddTransaction(newTransaction) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Transactions")
      .push(newTransaction);
  }
  AddUser(newUser) {
    firebase
      .database()
      .ref()
      .child("Main")
      .child("Users")
      .push(newUser);
  }
};
export default API;
