import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, data } = useQuery(GET_AUTH);

    if (data) {
        console.log(data);
    }

    return <Route {...rest} render={(props) => (!loading ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

const GET_AUTH = gql`
    {
        login @client {
            userId
        }
    }
`;

export default PrivateRoute;
