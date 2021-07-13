import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    CircularProgress,
    withStyles,
    Card,
    CardActions,
    CardContent,
    Divider,
    Button,
    Grid,
    TextField, makeStyles
} from "@material-ui/core";
import {
    CloudUpload
} from "@material-ui/icons";

import clsx from "clsx";
import axios from "axios";
import {API_BASE_URL} from "../../constants/apiConstants";
import {useHistory} from "react-router";

const Account = props => {

    const history = useHistory();
    const classes = useStyles();

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        isAuthor: '',
        uiloading: true,
        buttonLoading: false
    });


    const getBooks = async (req, res) => {
        const success = await axios.get(`${API_BASE_URL}/user/${localStorage.getItem('id')}`)
            .then((res) => {
                console.log(res);
                setState(prevState => ({
                    ...prevState,
                    "message" :"Success Retireving User"
                }))
            })
            .catch(err => {
                if (err.response.status === 403) {
                    history.push('/user/login')
                }
                console.log(err);
                setState({
                    errorMsg: "Error in retrieving data"
                })
            })
    }

    return (
        <div>

        </div>
    );
};

Account.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {},
    details: {
        display: 'flex'
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    locationText: {
        paddingLeft: '15px'
    },
    buttonProperty: {
        position: 'absolute',
        top: '50%'
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    progess: {
        position: 'absolute'
    },
    uploadButton: {
        marginLeft: '8px',
        margin: theme.spacing(1)
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    submitButton: {
        marginTop: '10px'
    }
}));

export default Account;