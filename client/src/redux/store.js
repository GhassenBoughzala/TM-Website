import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/authReducer";

const intialState = {};

const rootReducer = combineReducers({
  auth,
});

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
