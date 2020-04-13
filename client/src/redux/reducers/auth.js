import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from "../constants/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case LOGIN_SUCCESS:
            var t1 = new Date();
            t1.setSeconds(t1.getMinutes() + 30);
            localStorage.setItem("token", payload.token);
            localStorage.setItem("token_expires_at", t1);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            localStorage.removeItem("token_expires_at");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false
            };
        default:
            return state;
    }
}
