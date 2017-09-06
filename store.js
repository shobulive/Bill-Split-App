/*jslint es6 */
import { createStore, combineReducers, applyMiddleware } from "redux";
import currentUserReducer from "./reducers/SignInReducer";
import FetchUser from "./reducers/UsersReducer";
import { reducer as formReducer } from "redux-form";
import FetchGroups from "./reducers/GroupsReducer";
import GroupClickReducer from "./reducers/GroupClickReducer";
import FetchTransactionReducer from "./reducers/TransactionsReducer";
const reducer = combineReducers({
  currentUser: currentUserReducer,
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
const middleware = applyMiddleware(logger);
const store = createStore(reducer, middleware);
module.exports = store;
