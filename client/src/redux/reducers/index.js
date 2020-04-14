import { combineReducers } from "redux";
import auth from "./auth";
import navbar from "./navbar";

export default combineReducers({
    auth,
    navbar
});
