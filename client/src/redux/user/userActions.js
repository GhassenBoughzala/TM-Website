import axios from "axios";
import { ServerURL } from "../../helpers/urls";
//import { toast } from "react-toastify"
import { UPDATE_SUCCESS, UPDATE_FAILED, LOADING_USER } from "./userTypes";
import setAuthToken from "../../helpers/authToken";

export const UpdateUser = (values) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(values);
  dispatch({ type: LOADING_USER });
  setAuthToken(localStorage.accessToken);
  return axios
    .put(`${ServerURL}/api/user`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
      //toast.success("User details successfully updated !")
      window.location.reload()
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((err) => console.log(err), UPDATE_FAILED);
};
