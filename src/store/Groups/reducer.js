/*jslint es6 */
"use strict";
const initialState = {
  groups: [],
  fetched: false,
  fetching: false,
  error: null
};
export default function GroupsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_GROUPS_START":
      return { ...state, fetching: true };
      break;
    case "FETCH_GROUPS_ERROR":
      return { ...state, fetching: false, error: action.payload };
      break;
    case "FETCH_GROUPS_SUCCESS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        groups: action.payload
      };
      break;
  }
  return state;
}
