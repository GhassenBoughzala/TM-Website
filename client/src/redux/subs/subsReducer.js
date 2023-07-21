/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */

import {
  ADD_SUBS_FAILED,
  ADD_SUBS_LOADING,
  ADD_SUBS_SUCCESS,
  DEL_SUBS_FAILED,
  DEL_SUBS_SUCCESS,
  GET_FAIL,
  GET_FAIL_AD,
  GET_SUBS,
  GET_SUBS_AD,
  LOADING_SUBS,
  UPDATE_SUBS_FAILED,
  UPDATE_SUBS_LOADING,
  UPDATE_SUBS_SUCCESS,
} from "./subsTypes";

// Intial State
const intialState = {
  loading: true,
  loading_create: true,
  loading_update: true,
  error: null,
  codeMsg: null,
  subs: [],
  user_subs: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_SUBS:
      return { ...state, subs: [], loading: false };
    case GET_SUBS:
      return {
        ...state,
        user_subs: [...action.payload],
        loading: true,
      };
    case GET_FAIL:
      return { user_subs: [], error: true };

    case GET_SUBS_AD:
      return {
        ...state,
        subs: [...action.payload],
        loading: true,
      };
    case GET_FAIL_AD:
      return { subs: [], error: true };

    case ADD_SUBS_LOADING:
      return {
        ...state,
        loading_create: false,
        codeMsg: null,
      };
    case ADD_SUBS_SUCCESS:
      return {
        ...state,
        user_subs: [...state.user_subs, action.payload],
        codeMsg: 1,
        loading_create: true,
      };
    case ADD_SUBS_FAILED:
      return { ...state, codeMsg: 0, error: true, loading_create: true };

    case UPDATE_SUBS_LOADING:
      return {
        ...state,
        loading_update: false,
        codeMsg: null,
      };
    case UPDATE_SUBS_SUCCESS:
      return {
        ...state,
        subs: state.subs.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        codeMsg: 1,
        loading_update: true,
      };
    case UPDATE_SUBS_FAILED:
      return { ...state, codeMsg: 0, error: true, loading_update: true };

    case DEL_SUBS_SUCCESS:
      return {
        ...state,
        user_subs: state.user_subs.filter((c) => c._id !== action.payload),
      };
    case DEL_SUBS_FAILED:
    default:
      return state;
  }
}
