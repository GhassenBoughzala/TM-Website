/* eslint-disable import/no-anonymous-default-export */

import { FETCH_FAIL, FETCH_SUCCESS, LOADING_FETCH } from "./courseTypes";

// Intial State
const intialState = {
  loading: true,
  error: null,
  codeMsg: null,
  courses: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_FETCH:
      return { ...state, courses: [], loading: true };
    case FETCH_SUCCESS:
      return { ...state, courses: [...action.payload], loading: false };
    case FETCH_FAIL:
      return { ...state, courses: [], error: true };
    default:
      return state;
  }
}
