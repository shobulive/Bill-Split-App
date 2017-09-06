/*jslint es6 */
"use strict";
const initialState = {
  users: {},
  fetched: false,
  fetching: false,
  error: null
};
export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, fetching: true };
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
  }
  return state;
}
