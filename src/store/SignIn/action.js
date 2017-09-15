/*jslint es6 */
"use strict";
const LoginAction = CurrentUser => {
  return async (dispatch, getState) => {
    dispatch({ type: "SUCCESS_LOGIN", payload: CurrentUser });
  };
};
export default LoginAction;
