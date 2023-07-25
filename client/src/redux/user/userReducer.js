/* eslint-disable import/no-anonymous-default-export */
import {
  ALL_FAILED,
  ALL_SUCCESS,
  LOADING_USER,
  LOADING_USERS,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
} from "./userTypes";

// Intial State
const intialState = {
  loading: false,
  error: null,
  codeMsg: null,
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
    default:
      return state;
  }
}
