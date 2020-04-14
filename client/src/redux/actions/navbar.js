import { SET_NAV } from "../constants/types";

// Set Navbar link
export const setNav = (payload) => (dispatch) => {
    dispatch({ type: SET_NAV, payload });
};
