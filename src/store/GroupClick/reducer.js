/*jslint es6 */
"use strict";
const initialState = { CurrentGroup: "" };
export default function GroupClickReducer(state = initialState, action) {
  if (action.type === "SUCCESS_GROUP_CLICK") {
    return { ...state, CurrentGroup: action.payload };
  } else return { ...state };
}
