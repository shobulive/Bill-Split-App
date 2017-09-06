"use strict";
import store from "../store";
export default function GroupClickAction(CurrentGroup) {
  store.dispatch({ type: "SUCCESS_GROUP_CLICK", payload: CurrentGroup });
}
