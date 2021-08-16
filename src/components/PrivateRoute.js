import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userIsSignedIn} from '../services/db-call';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                userIsSignedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
