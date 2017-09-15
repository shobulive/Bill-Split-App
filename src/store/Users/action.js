import axios from "axios";
import API from "../../services/FirebaseAPI";
const FetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_USERS_START" });
    axios
      .get(new API().FetchUsersAPI())
      .then(response =>
        dispatch({
          type: "FETCH_USERS_SUCCESS",
          payload: response.data
        })
      )
      .catch(err => {
        dispatch({ type: "FETCH_USERS_ERROR", payload: err });
      });
  };
};
export default FetchUsers;
