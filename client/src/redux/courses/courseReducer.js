/* eslint-disable import/no-anonymous-default-export */

import {
  ADD_FAILED,
  ADD_SUCCESS,
  DEL_FAILED,
  DEL_SUCCESS,
  FETCH_FAIL,
  FETCH_SUCCESS,
  LOADING,
} from "./courseTypes";

// Intial State
const intialState = {
  loading: true,
  error: null,
  codeMsg: null,
  courses: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, courses: [], loading: true };
    case FETCH_SUCCESS:
      return { ...state, courses: [...action.payload], loading: false };
    case FETCH_FAIL:
      return { ...state, courses: [], error: true };

    case ADD_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        codeMsg: 1,
        loading: false,
      };
    case ADD_FAILED:
      return { ...state, codeMsg: 0, error: true, loading:false };

    case DEL_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((c) => c._id !== action.payload),
      };
    case DEL_FAILED:
    default:
      return state;
  }
}
