import { ServerURL } from "../../helpers/urls";
import setAuthToken from "../../helpers/authToken";
import axios from "axios";

import { toast } from "react-toastify";
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  ERROR,
  REFTOKEN_ERROR,
  REFTOKEN_IS_SET,
  FORGOTPASS_REQ,
  FORGOTPASS_FAIL,
  SET_LOADING_TOKEN,
  LOGOUT,
  VERIF,
} from "./authTypes";

export const loadUser = () => async (dispatch) => {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  try {
    const res = await axios.get(`${ServerURL}/api/user/`);
    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ERROR,
    });
  }
};

export const verifUser = () => async (dispatch) => {
  try {
    dispatch({ type: VERIF });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR });
  }
};

export const register = (values) => async (dispatch) => {
  // Config header for axios
  const config = { headers: { "Content-Type": "application/json" } };
  // Set body
  const body = JSON.stringify(values);
  dispatch({ type: SET_LOADING });

  try {
    // Response
    const res = await axios.post(
      `${ServerURL}/api/access/register`,
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (values) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(values);
  dispatch({ type: SET_LOADING });
  axios
    .post(`${ServerURL}/api/access/login`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      toast.info("Welcome");
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => async (dispatch) => {
  try {
    setAuthToken(localStorage.accessToken);
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
    });
  }
};

export const refreshJwt =
  ({ refreshToken }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };
    // Set body
    const body = JSON.stringify({ refreshToken });

    dispatch({ type: SET_LOADING_TOKEN });

    try {
      const res = axios.post(
        `${ServerURL}/api/access/refresh-token`,
        body,
        config
      );
      const { data } = await res;
      dispatch({
        type: REFTOKEN_IS_SET,
        payload: data,
      });
      window.location.reload();
    } catch (err) {
      dispatch({ type: REFTOKEN_ERROR });
      dispatch(logout());
    }
  };

export const forgotPass =
  ({ email }) =>
  async (dispatch) => {
    try {
      // Config header for axios
      const config = { headers: { "Content-Type": "application/json" } };
      // Set body
      const body = JSON.stringify({ email });

      await axios.post(`${ServerURL}/api/access/forgot-pass`, body, config);
      dispatch({ type: FORGOTPASS_REQ });
      toast.info("Mot de passe oublié: e-mail envoyé avec succès");
    } catch (error) {
      console.log(error);
      toast.error("Quelque chose s'est mal passé !");
      dispatch({ type: FORGOTPASS_FAIL });
    }
  };
