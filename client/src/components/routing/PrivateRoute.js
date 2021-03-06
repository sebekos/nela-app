import React from "react";
// eslint-disable-next-line
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {
        data: {
            auth: { isAuth }
        },
        loading
    } = useQuery(CHECK_AUTH_QUERY);
    // if (!isAuth) {
    //     return <Redirect to="/login" />;
    // }
    return <Route {...rest} render={(props) => (!loading && !isAuth ? null : <Component {...props} />)} />;
};

const CHECK_AUTH_QUERY = gql`
    {
        auth @client {
            isAuth
        }
    }
`;

export default PrivateRoute;
