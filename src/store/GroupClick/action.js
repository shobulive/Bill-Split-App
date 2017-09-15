/*jslint es6 */
"use strict";
const GroupClickAction = CurrentGroup => {
  return async (dispatch, getState) => {
    dispatch({ type: "SUCCESS_GROUP_CLICK", payload: CurrentGroup });
  };
};
export default GroupClickAction;
