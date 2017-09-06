/*jslint es6 */
"use strict";
import store from "../store";
export default function LoginAction(CurrentUser) {
  store.dispatch({ type: "SUCCESS_LOGIN", payload: CurrentUser });
}
