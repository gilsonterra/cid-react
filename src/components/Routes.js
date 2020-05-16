import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/Auth';
import Login from '../pages/Login';
import AdminLayout from '../layouts/AdminLayout';
import NotFound from '../pages/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {        
        if (isAuthenticated())
            return <Component {...props} />

        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }} />
);

const Routes = () => {    
    return <BrowserRouter>
            <Switch>   
                <Route exact path="/">
                    <Login />
                </Route>             
                <Route exact path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/admin">
                    <AdminLayout />
                </PrivateRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>    
};

export default Routes;