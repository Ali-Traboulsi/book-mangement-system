import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
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
import {API_BASE_URL} from "../../constants/apiConstants";
import {Link} from "react-router-dom";

const AuthorBooks = props => {


    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    console.log(id);

    const fetchAuthorBooks = () => {
        axios.get(`${API_BASE_URL}/books/${id}`)
            .then(res => {
                console.log(res.data.data)
                setBooks(res.data.data);
                console.log(books);
            });
    }

    useEffect(() => {
        fetchAuthorBooks();
    }, [])

    return (
        <>
            <Grid
                container
                spacing={3}
            >
                {
                    (books) ?
                        (books.map((val) =>
                            (
                                <>
                                    <Grid
                                        item
                                        // key={val.id}
                                        lg={4}
                                        md={6}
                                        xs={12}
                                    >
                                        <Card className={classes.root} variant="outlined">
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    {val.title}
                                                </Typography>
                                                {/*<Typography className={classes.pos} color="textSecondary">*/}
                                                {/*    {dayjs(.createdAt).fromNow()}*/}
                                                {/*</Typography>*/}
                                                <Typography variant="body2" component="p">
                                                    {val.brief}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link>
                                                    <Typography>
                                                        {val.author._path.segments[1]}
                                                    </Typography>
                                                </Link>
                                                <Button size="small" color="primary">
                                                    {' '}
                                                    View{' '}
                                                </Button>
                                                <Button size="small" color="primary">
                                                    {val.published}
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </>
                            )
                        )) : <CircularProgress />
                }
            </Grid>

                                </>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 300,
        objectFit: "scale-down",
    },
    title: {
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Monospace",
        letterSpacing: "100px",
        fontSize: "100px"
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    fixed: {
        position: "fixed"
    }
}));

AuthorBooks.propTypes = {
    
};




export default AuthorBooks;