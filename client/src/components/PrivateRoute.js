import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* When trying to access a Private Route - Check if the user is logged in */
export default function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => 

        localStorage.getItem("IsLoggedIn")
        ? ( <Component {...props} /> )
        : ( <Redirect to="/signin" /> )
      }
    />
  )
}