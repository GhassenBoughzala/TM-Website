import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/authReducer";
import courses from "./courses/courseReducer";
import user from "./user/userReducer";
import subs from "./subs/subsReducer";

const intialState = {};

const rootReducer = combineReducers({
  auth,
  courses,
  user,
  subs
});

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
