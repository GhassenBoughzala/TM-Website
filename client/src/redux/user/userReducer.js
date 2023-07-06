/* eslint-disable import/no-anonymous-default-export */
import { LOADING_USER, UPDATE_FAILED, UPDATE_SUCCESS } from "./userTypes";

// Intial State
const intialState = {
  loadingUser: false,
  error: null,
  codeMsg: null,
  user: localStorage.getItem("user")
};

export default function (state = intialState, action) {
  switch (action.type) {
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
