import { SET_NAV } from "../constants/types";

const initialState = {
    currMenu: "Home"
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_NAV:
            return {
                ...state,
                currMenu: payload
            };
        default:
            return state;
    }
}
