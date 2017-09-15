import axios from "axios";
import API from "../../services/FirebaseAPI";
const FetchGroups = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_GROUPS_START" });
    axios
      .get(new API().FetchGroupsAPI())
      .then(response =>
        dispatch({
          type: "FETCH_GROUPS_SUCCESS",
          payload: response.data
        })
      )
      .catch(err => {
        dispatch({ type: "FETCH_GROUPS_ERROR", payload: err });
      });
  };
};
export default FetchGroups;
