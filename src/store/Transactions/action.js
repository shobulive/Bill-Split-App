/*jslint es6 */
import axios from "axios";
import API from "../../services/FirebaseAPI";
const FetchTransactions = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_TRANSACTION_START" });
    axios
      .get(new API().FetchTransactionsAPI())
      .then(response =>
        dispatch({
          type: "FETCH_TRANSACTION_SUCCESS",
          payload: response.data
        })
      )
      .catch(err => {
        dispatch({ type: "FETCH_TRANSACTION_ERROR", payload: err });
      });
  };
};
export default FetchTransactions;
