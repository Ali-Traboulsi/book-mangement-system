import React, {useState} from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    withStyles,
    Container,
    CircularProgress, makeStyles
} from '@material-ui/core';
import {LockOutlinedIcon} from "@material-ui/icons";
import axios from "axios";
import {useHistory} from "react-router";
import {userLogin} from "../../api/api";
import {pattern} from "../../constants/pattern";

const Login = (props) => {

    const classes = useStyles();
    const history = useHistory();

    const redirectToHome = () => {
        history.push('/home');
    };

    const handleChange = (e) => {
        const {id, value} = e.target;
        let errors = state.errors;

        switch (id) {
            case 'email':
                errors.email = pattern.test(value)
                    ? ''
                    : "* Email is not valid";
                break;
            case 'password':
                errors.password = (value.length < 6)
                    ? "* Password must be at least 6 characters"
                    : '';
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({loading: true});
        let errors = state.errors;
        userLogin(state, setState)
            .then(res => {
                console.log(res);
                console.log(res.data === true);
                if (res.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }));
                    redirectToHome();
                }
            })
            .catch(err => {
                console.log(err);
                setState({
                    errors: err,
                    loading: false
                });
            });
    }


        const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
        loading: false
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={state.loading || !state.email || !state.password}
                    >
                        Sign In
                        {state.loading && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
};

const useStyles = makeStyles(
    (theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progess: {
            position: 'absolute'
        }
    })
);


export default Login;