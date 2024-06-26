/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */

import {
  ADD_FAILED,
  ADD_LOADING,
  ADD_SUCCESS,
  DEL_FAILED,
  DEL_SUCCESS,
  FETCH_FAIL,
  FETCH_FAIL_AD,
  FETCH_SUCCESS,
  FETCH_SUCCESS_AD,
  LOADING,
  LOADING_SELECT,
  SELECT_FAIL,
  SELECT_SUCCESS,
  UPDATE_FAILED,
  UPDATE_LOADING,
  UPDATE_SUCCESS,
} from "./courseTypes";

// Intial State
const intialState = {
  loading: true,
  loading_create: true,
  loading_update: true,
  error: null,
  codeMsg: null,
  courses: [],
  coursesAD: [],
  courseObj: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        courses: [],
        coursesAD: [],
        loading: false,
        courseObj: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        courses: [...action.payload],
        loading: true,
        courseObj: null,
      };
    case FETCH_FAIL:
      return { courses: [], error: true };

    case FETCH_SUCCESS_AD:
      return {
        ...state,
        coursesAD: [...action.payload],
        loading: true,
        courseObj: null,
      };
    case FETCH_FAIL_AD:
      return { coursesAD: [], error: true };

    case ADD_LOADING:
      return {
        ...state,
        loading_create: false,
        codeMsg: null,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        codeMsg: 1,
        loading_create: true,
      };
    case ADD_FAILED:
      return { ...state, codeMsg: 0, error: true, loading_create: true };

    case UPDATE_LOADING:
      return {
        ...state,
        loading_update: false,
        codeMsg: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        codeMsg: 1,
        loading_update: true,
      };
    case UPDATE_FAILED:
      return { ...state, codeMsg: 0, error: true, loading_update: true };

    case DEL_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((c) => c._id !== action.payload),
      };
    case DEL_FAILED:

    case LOADING_SELECT:
      return { ...state.courseObj, loading: true, courseObj: null };
    case SELECT_SUCCESS:
      return {
        ...state,
        loading: true,
        courseObj: action.payload,
      };
    case SELECT_FAIL:
      return { courseObj: null, error: true };

    default:
      return state;
  }
}
