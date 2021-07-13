import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect, useHistory
} from 'react-router-dom';
import Login from "../Pages/Login/Login";

import PropTypes from 'prop-types';
import Home from "../Pages/Home/Home";

const authRoute = (Component) => () => {
    if (localStorage.getItem('access_token')) {
        return <Component />
    } else {
        return <Redirect to="/user/login" />
    }
}

const Routes = props => {
    return (
        <Router {...props}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
                <Route path="/user/login" component={Login}/>
                <Route path="/home" component={Home} />
            </Switch>
        </Router>
    );
};

Routes.propTypes = {

};

export default Routes;