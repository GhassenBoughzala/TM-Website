import axios from "axios";
import { ServerURL } from "../../helpers/urls";
import { toast } from "react-toastify";
import {
  ADD_FAILED,
  ADD_SUCCESS,
  DEL_FAILED,
  DEL_SUCCESS,
  FETCH_FAIL,
  FETCH_SUCCESS,
  LOADING,
} from "./courseTypes";
import setAuthToken from "../../helpers/authToken";

export const getCourses = () => (dispatch) => {
  dispatch({ type: LOADING });
  return axios
    .get(`${ServerURL}/api/courses/all`)
    .then((res) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), FETCH_FAIL);
};

export const addCourses = (values) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(values);
  dispatch({ type: LOADING });
  setAuthToken(localStorage.accessToken);
  return axios
    .post(`${ServerURL}/api/courses/`, body, config)
    .then((res) => {
      dispatch({
        type: ADD_SUCCESS,
        payload: res.data,
      });
      toast.success("Course successfully added");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ADD_FAILED,
      });
      toast.error("Something went wrong !");
    });
};

export const deleteCourse = (id) => (dispatch) => {
  setAuthToken(localStorage.accessToken);
  return axios
    .delete(`${ServerURL}/api/courses/` + id)
    .then(() => {
      dispatch({
        type: DEL_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => console.log(err), DEL_FAILED);
};
