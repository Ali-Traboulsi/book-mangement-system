import React from 'react';
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


const BookCard = props => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2}>
                {
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {props.value.title}
                            </Typography>
                            {/*<Typography className={classes.pos} color="textSecondary">*/}
                            {/*    {dayjs(.createdAt).fromNow()}*/}
                            {/*</Typography>*/}
                            <Typography variant="body2" component="p">
                                {`${props.value.brief.substring(0, 65)}`}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Typography>
                                {props.value.author}
                            </Typography>
                            <Button size="small" color="primary">
                                {' '}
                                View{' '}
                            </Button>
                            <Button size="small" color="primary">
                                {props.value.published}
                            </Button>
                            <Button size="small" color="primary">
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                }
            </Grid>
        </div>
    );
};


BookCard.propTypes = {
    
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

export default BookCard;