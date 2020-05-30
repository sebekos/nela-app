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
    return <Route {...rest} render={(props) => (!loading && !isAuth ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

const CHECK_AUTH_QUERY = gql`
    {
        auth @client {
            isAuth
        }
    }
`;

export default PrivateRoute;
