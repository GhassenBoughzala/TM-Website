import axios from "axios";
import { ServerURL } from "../../helpers/urls";

import { FETCH_FAIL, FETCH_SUCCESS, LOADING_FETCH } from "./courseTypes";

export const getCourses = () => (dispatch) => {
  dispatch({ type: LOADING_FETCH });
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
