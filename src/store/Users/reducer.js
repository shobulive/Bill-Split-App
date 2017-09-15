/*jslint es6 */
"use strict";
const initialState = {
  users: {},
  fetched: false,
  fetching: false,
  error: null,
  data: null
};
export default function UsersReducer(state = initialState, action) {
  console.log(action, "action");
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, fetching: true, data: action.data };
      break;
    case "FETCH_USERS_ERROR":
      return { ...state, fetching: false, error: action.payload };
      break;
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
      break;
    default:
      return { ...state };
  }
  return state;
}
