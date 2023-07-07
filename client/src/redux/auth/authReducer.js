/* eslint-disable import/no-anonymous-default-export */
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  ERROR,
  REFTOKEN_ERROR,
  REFTOKEN_IS_SET,
  RESEND,
  FORGOTPASS_REQ,
  FORGOTPASS_FAIL,
  SET_LOADING_TOKEN,
  VERIF,
} from "./authTypes";

// Intial State
const intialState = {
  accessToken: localStorage.getItem("accessToken"),
  expiresIn: localStorage.getItem("expiresIn"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  codeMsg: null,
  loading: true,
};

// Reducers
export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case VERIF:
      return {
        ...state,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        codeMsg: 1,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        codeMsg: 1,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        isAuthenticated: null,
        codeMsg: null,
      };
    case REFTOKEN_IS_SET:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        codeMsg: 0,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        codeMsg: 0,
      };
    case AUTH_ERROR:
    case REFTOKEN_ERROR:
    case RESEND:
    case ERROR:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOGOUT:
      // Remove Token in localstorage
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case FORGOTPASS_REQ:
    case FORGOTPASS_FAIL:
    case SET_LOADING_TOKEN:
    default:
      return state;
  }
}
