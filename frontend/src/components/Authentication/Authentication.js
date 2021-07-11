import React from 'react';
import PropTypes from 'prop-types';

const Authentication = props => {
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </div>
    );
};

Authentication.propTypes = {

};

export default Authentication;