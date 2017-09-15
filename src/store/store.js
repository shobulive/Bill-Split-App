/*jslint es6 */
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import CurrentUserReducer from "./SignIn/reducer";
import FetchUser from "./Users/reducer";
import FetchGroups from "./Groups/reducer";
import GroupClickReducer from "./GroupClick/reducer";
import FetchTransactionReducer from "./Transactions/reducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  fetchUser: FetchUser,
  fetchGroups: FetchGroups,
  form: formReducer,
  GroupClickReducer: GroupClickReducer,
  FetchTransactionReducer: FetchTransactionReducer
});
const logger = store => next => action => {
  next(action);
  console.log(action);
};

const middleware = applyMiddleware(logger, thunk);
const store = createStore(reducer, middleware);
module.exports = store;
