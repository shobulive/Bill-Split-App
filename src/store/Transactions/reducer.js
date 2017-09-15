/*jslint es6 */
"use strict";
const initialState = {
  trans: [],
  fetched: false,
  fetching: false,
  error: null
};
export default function TransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TRANSACTION_START":
      return { ...state, fetching: true };
      break;
    case "FETCH_TRANSACTION_ERROR":
      return { ...state, fetching: false, error: action.payload };
      break;
    case "FETCH_TRANSACTION_SUCCESS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        trans: action.payload
      };
      break;
  }
  return state;
}
