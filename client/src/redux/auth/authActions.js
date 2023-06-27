import { ServerURL } from "helpers/urls";
import setAuthToken from "helpers/authToken";
import axios from "axios";
import { toast } from "react-toastify";

import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING,
  ERROR,
  REFTOKEN_ERROR,
  REFTOKEN_IS_SET,
  RESEND,
  FORGOTPASS_REQ,
  FORGOTPASS_FAIL,
  SET_LOADING_TOKEN,
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

export const register =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };
    // Set body
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });

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
      toast.success("Inscription avec succès");
      //toast.info("Vérifiez votre email pour activer votre compte");
    } catch (err) {
      toast.error("Inscription: Quelque chose s'est mal passé !");
      console.log(err);
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const login =
  ({ email, password, OneSignalID }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };

    // Set body
    const body = JSON.stringify({
      email,
      password,
      OneSignalID,
    });
    dispatch({ type: SET_LOADING });

    try {
      const res = await axios
        .post(`${ServerURL}/api/access/loginuser`, body, config)
        .catch(function (error) {
          //console.log(error.response.data.msg);
          toast.warn(error.response.data.msg);
        });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());

      toast.success("Connecté avec succès");
    } catch (err) {
      console.log(err);
      //toast.error("Quelque chose s'est mal passé !")
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = (OneSignalID) => async (dispatch) => {
  try {
    setAuthToken(localStorage.accessToken);
    await axios
      .put(`${ServerURL}/api/user/osid`, { OneSignalID: OneSignalID })
      .then((res) => {
        dispatch({ type: LOGOUT });
      })
      .catch((err) => console.log(err), ERROR, localStorage.clear());
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

export const resend = () => async (dispatch) => {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  try {
    await axios.get(
      `${ServerURL}/api/access/resend/` + localStorage.accessToken
    );
    dispatch({ type: RESEND });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
    });
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
