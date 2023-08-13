import axios from "axios";
//import { toast } from "react-toastify"
import {
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  LOADING_USER,
  LOADING_USERS,
  ALL_SUCCESS,
  ALL_FAILED,
  UPDATE_SUBS_LOADING,
  UPDATE_SUBS_SUCCESS,
  UPDATE_SUBS_FAILED,
} from "./userTypes";
import setAuthToken from "../../helpers/authToken";

export const updateUser = (values) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(values);
  dispatch({ type: LOADING_USER });
  setAuthToken(localStorage.accessToken);
  return axios
    .put(`/api/user`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
      //toast.success("User details successfully updated !")
      window.location.reload();
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((err) => console.log(err), UPDATE_FAILED);
};

export const getUsers = () => (dispatch) => {
  dispatch({ type: LOADING_USERS });
  setAuthToken(localStorage.accessToken);
  return axios
    .get(`/api/subscription/all`)
    .then((res) => {
      dispatch({
        type: ALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ALL_FAILED });
    });
};

export const updateSub = (id, status) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ status: status });
  dispatch({ type: UPDATE_SUBS_LOADING });
  setAuthToken(localStorage.accessToken);
  try {
    const res = await axios.put(
      `/api/subscription/` + id,
      body,
      config
    );
    dispatch({
      type: UPDATE_SUBS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_SUBS_FAILED,
    });
  }
};
