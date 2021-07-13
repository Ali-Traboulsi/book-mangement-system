import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {useHistory} from "react-router";
import Books from "../../components/Books/Books";

const Home = props => {

    const history = useHistory();

    const [state, setState] = useState({
        render: false,
        firstName: '',
        lastName: '',
        uiloading: '',
    });

    const loadBooksPage = () => {
        setState({
            render: false
        });
    };

    const loadAuthorsPage = () => {
        setState({
            render: false
        });
    };

    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        history.push('/user/login');
    }

    // const getUserDate = () => {
    //     const authToken = localStorage.getItem('ACCESS_TOKEN');
    //     axios.default.headers.common = {Authorization: `${authToken}`};
    // }



    return (
        <div>
            <Books />
        </div>
    );
};

Home.propTypes = {

};

export default Home;