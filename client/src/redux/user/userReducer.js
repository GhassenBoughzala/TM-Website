/* eslint-disable import/no-anonymous-default-export */
import {
  ALL_FAILED,
  ALL_SUCCESS,
  LOADING_USER,
  LOADING_USERS,
  SEND_FAILED,
  SEND_LOADING,
  SEND_SUCCESS,
  UPDATE_FAILED,
  UPDATE_SUBS_FAILED,
  UPDATE_SUBS_LOADING,
  UPDATE_SUBS_SUCCESS,
  UPDATE_SUCCESS,
} from "./userTypes";

// Intial State
const intialState = {
  loading: false,
  loading_update: false,
  error: null,
  codeMsg: null,
  message: null,
  user: localStorage.getItem("user"),
  users: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_USERS:
      return { ...state, users: [], loading: true };
    case ALL_SUCCESS:
      return { ...state, users: [...action.payload], loading: false };
    case ALL_FAILED:
      return { ...state, users: [], error: true };

    case LOADING_USER:
      return { ...state, loading: true };
    case UPDATE_SUCCESS:
      return { ...state, user: action.payload, loading: false, codeMsg: 1 };
    case UPDATE_FAILED:
      return { ...state, user: null, error: true, loading: false, codeMsg: 0 };

    case UPDATE_SUBS_LOADING:
      return {
        ...state,
        loading_update: true,
        loading: true,
        codeMsg: null,
      };
    case UPDATE_SUBS_SUCCESS:
      return {
        ...state,
        users: state.users.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        codeMsg: 1,
        loading_update: false,
      };
    case UPDATE_SUBS_FAILED:
      return {
        ...state,
        codeMsg: 0,
        error: true,
        loading_update: false,
        users: [],
      };

    case SEND_LOADING:
      return { ...state, loading: true, message: null };
    case SEND_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case SEND_FAILED:
      return { ...state, error: true, loading: false, message: action.payload };

    default:
      return state;
  }
}
