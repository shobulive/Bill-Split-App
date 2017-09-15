/*jslint es6 */
"use strict";
const initialState = { CurrentUser: {} };
export default function SignInReducer(state = initialState, action) {
  if (action.type === "SUCCESS_LOGIN") {
    return { ...state, CurrentUser: action.payload };
  } else return { ...state };
}
