import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    TextField,
    Grid,
    Card,
    CardActions,
    CircularProgress,
    CardContent,
    MuiDialogTitle,
    MuiDialogContent, makeStyles,
    Typography
} from '@material-ui/core';

import {AppCircle, IconButton, Close} from '@material-ui/icons';
import axios from "axios";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {API_BASE_URL} from "../../constants/apiConstants";
import {useHistory} from "react-router";
import BookCard from "./BookCard";
import {fetchBooks} from "../../api/api";

const Books = props => {

    const history = useHistory();
    const classes = useStyles();

    const [bookData, setBookData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            await axios.get(`${API_BASE_URL}/books`)
                .then(res => {
                    console.log(res);
                    setBookData(res.data.data.data)
                    console.log(bookData);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        fetchBook();
    },[]);


    return (
        <div>
            <Grid
                container
                spacing={3}
            >
                {
                    bookData ?
                        (bookData.map((val) => {
                            return (
                                <Grid
                                    item
                                    key={val.id}
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    Home
                                </Grid>
                            )
                        })) : <CircularProgress />
                }
            </Grid>
        </div>
    );
};

Books.propTypes = {

};



const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: theme.spacing(3)
    },
    root: {
        minWidth: 470
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    dialogeStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }


}));

export default Books;