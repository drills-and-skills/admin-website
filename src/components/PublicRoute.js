import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userIsSignedIn} from '../services/db-call';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                userIsSignedIn() && restricted ? (
                    <Redirect to="/home" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
