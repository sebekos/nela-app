import { SET_NAV } from "../constants/types";

// Set Navbar link
export const setNav = (payload) => (dispatch) => {
    payload = payload === "" ? "Home" : payload;
    dispatch({ type: SET_NAV, payload });
};
